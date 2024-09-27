using System.Collections.Generic;


public class ClinicDetails 
{
   public string Id { get; set; }
    public string Name { get; set; }
    public OpeningHours OpeningHours { get; set; }
    public string PlaceId { get; set; }
    public double Rating { get; set; }
    public string Website { get; set; }
    public string FormattedPhoneNumber { get; set; }
    public string FormattedAddress { get; set; }

}


// all the data we get back from the API call to the Places API for 'place details'
public class PlaceDetailsResponse
{
    public List<string> HtmlAttributions { get; set; }
    public PlaceResult Result { get; set; }
    public string Status { get; set; }
}

public class PlaceResult
{
    public List<AddressComponent> AddressComponents { get; set; }
    public string AdrAddress { get; set; }
    public string BusinessStatus { get; set; }
    public string FormattedAddress { get; set; }
    public Geometry Geometry { get; set; }
    public string Icon { get; set; }
    public string Id { get; set; }
    public string Name { get; set; }
    public OpeningHours OpeningHours { get; set; }
    public List<Photo> Photos { get; set; }
    public string PlaceId { get; set; }
    public double Rating { get; set; }
    public List<Review> Reviews { get; set; }
    public string Scope { get; set; }
    public List<string> Types { get; set; }
    public string Url { get; set; }
    public int UtcOffset { get; set; }
    public string Vicinity { get; set; }
    public string Website { get; set; }
    public string FormattedPhoneNumber { get; set; }
}

public class AddressComponent
{
    public string LongName { get; set; }
    public string ShortName { get; set; }
    public List<string> Types { get; set; }
}

public class Geometry
{
    public Location Location { get; set; }
    public Viewport Viewport { get; set; }
}

public class Location
{
    public double Lat { get; set; }
    public double Lng { get; set; }
}

public class Viewport
{
    public Location Northeast { get; set; }
    public Location Southwest { get; set; }
}

public class OpeningHours
{
    public bool OpenNow { get; set; }
    public List<OpeningPeriod> Periods { get; set; }
    public List<string> WeekdayText { get; set; }
}

public class OpeningPeriod
{
    public OpeningTime Open { get; set; }
    public OpeningTime Close { get; set; }
}

public class OpeningTime
{
    public int Day { get; set; }
    public string Time { get; set; }
}

public class Photo
{
    public int Height { get; set; }
    public List<string> HtmlAttributions { get; set; }
    public string PhotoReference { get; set; }
    public int Width { get; set; }
}

public class Review
{
    public string AuthorName { get; set; }
    public string AuthorUrl { get; set; }
    public string Language { get; set; }
    public string ProfilePhotoUrl { get; set; }
    public int Rating { get; set; }
    public string RelativeTimeDescription { get; set; }
    public string Text { get; set; }
    public long Time { get; set; }
}
