using server.Models;

namespace server.Services;

public static class VetClinicService
{
  static List<VetClinic> VetClinics { get; }
  static int nextId = 5;
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

  public static void Add(VetClinic vetClinic)
  {
    vetClinic.Id = nextId++;
    VetClinics.Add(vetClinic);
  }

  public static void Delete(int id)
  {
    var vetClinic = Get(id);
    if (vetClinic is null)
      return;

    VetClinics.Remove(vetClinic);
  }

  public static void Update(VetClinic vetClinic)
  {
    var index = VetClinics.FindIndex(i => i.Id == vetClinic.Id);
    if (index == -1)
      return;

    VetClinics[index] = vetClinic;
  }


}
