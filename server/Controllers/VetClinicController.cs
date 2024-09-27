using server.Models;
using server.Services;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq; // For JObject parsing
using DotNetEnv;

namespace urgent_vet_care.Controllers;

[ApiController]
[Route("[controller]")]
public class VetClinicController : ControllerBase
{
  private readonly HttpClient _httpClient;
  private readonly string _apiKey;

  public VetClinicController(HttpClient httpClient)
  {
    _httpClient = httpClient;
    _apiKey = DotNetEnv.Env.GetString("GOOGLE_API_KEY", "Google API key not found");

  }

  [HttpGet("nearby-clinics")]
  public async Task<ActionResult<List<VetClinic>>> GetNearbyVetClinics(double lat, double lng, int radius = 30000)
  {
    string requestUri = $"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={lat},{lng}&radius={radius}&type=veterinary_care&opennow=true&key={_apiKey}";

    try
    {
      var response = await _httpClient.GetStringAsync(requestUri);
      var data = JObject.Parse(response);
      var results = data["results"];
      var vetClinics = new List<VetClinic>();

      foreach (var result in results)
      {
        var businessStatus = result["business_status"]?.ToString();
        if (businessStatus == "OPERATIONAL")
        {
          vetClinics.Add(new VetClinic
          {
            Name = result["name"]?.ToString() ?? string.Empty,
            Address = result["vicinity"]?.ToString() ?? string.Empty,
            Rating = result["rating"]?.ToObject<double>() ?? 0.0,
            Location = new Location
            {
              Lat = result["geometry"]?["location"]?["lat"]?.ToObject<double>() ?? 0.0,
              Lng = result["geometry"]?["location"]?["lng"]?.ToObject<double>() ?? 0.0
            },
            PlaceId = result["place_id"]?.ToString() ?? string.Empty,
            BusinessStatus = businessStatus ?? string.Empty
          });
        }
      }

      return Ok(vetClinics);
    }
    catch (Exception)
    {
      // Log the exception (ex) here for debugging
      return StatusCode(500, "Internal server error");
    }
  }

  [HttpGet("clinic-details")]
  public async Task<ActionResult<ClinicDetails> GetClinicDetails(string placeId)
  {
    string requestUri = $"https://maps.googleapis.com/maps/api/place/details/json?place_id={placeId}&key={_apiKey}";

    try
    {
      var response = await _httpClient.GetStringAsync(requestUri);
      var data = JObject.Parse(response);
      var results = data["results"];
      var clinicDetails = new <ClinicDetails> ();

      clinicDetails.Add(new ClinicDetails
      {
        Id = results.name["id"]?.ToString() ?? string.Empty;
        Name = results.name["name"]?.ToString() ?? string.Empty;
        OpeningHours = new OpeningHours
        {
          OpenNow = result["opening_hours"]?["open_now"]?.ToObject<bool>() ?? false,
          WeekdayText = result["opening_hours"]?["weekday_text"]?.ToObject<List<string>>() ?? new List<string>(),
          Periods = result["opening_hours"]?["periods"]?.Select(p => new OpeningPeriod
          {
            Open = new OpeningTime
            {
              Day = p["open"]?["day"]?.ToObject<int>() ?? 0,
              Time = p["open"]?["time"]?.ToString() ?? string.Empty
            },
            Close = new OpeningTime
            {
              Day = p["close"]?["day"]?.ToObject<int>() ?? 0,
              Time = p["close"]?["time"]?.ToString() ?? string.Empty
            }
          }).ToList() ?? new List<OpeningPeriod>()
        }
        PlaceId = results["place_id"]?.ToString() ?? string.Empty;
        Rating = results["rating"]?.ToObject<double>() ?? 0.0,
        Website = results["website"]?.ToString() ?? string.Empty;
        FormattedPhoneNumber = result["formatted_phone_number"]?.ToString() ?? string.Empty,
        FormattedAddress = result["formatted_address"]?.ToString() ?? string.Empty,
      })

    return Ok(clinicDetails);
    }
    catch (Exception)
    {
      // Log the exception (ex) here for debugging
      return StatusCode(500, "Internal server error");
    }
  }
}
