using server.Models; 

namespace server.Services; 

public static class VetClinicService 
{
  static List<VetClinic> VetClinics { get; }
  static int nextId = 3; 
  static VetClinicService()
  {
    VetClinics = new List<VetClinic>
    {
      new VetClinic { Id = 1, Name = "Clinic 1", Address = "123 Vet St"},
      new VetClinic { Id = 2, Name = "Clinic 2", Address = "123 Vet2 St"},
      new VetClinic { Id = 3, Name = "Clinic 3", Address = "123 Vet3 St"},
      new VetClinic { Id = 4, Name = "Clinic 4", Address = "123 Vet4 St"},
       };
    }

    public static List<VetClinic> GetAll() => VetClinics; 

    public static VetClinic? Get(int id) => VetClinics.FirstOrDefault(p => p.Id == id); 

   
  }