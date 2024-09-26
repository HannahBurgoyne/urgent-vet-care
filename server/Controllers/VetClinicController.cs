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
}
