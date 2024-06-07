using server.Models; 
using server.Services; 
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Mvc;

namespace urgent_vet_care.Controllers; 

[ApiController]
[Route("[controller]")] 
public class VetClinicController : ControllerBase
{
  public VetClinicController() 
  {

  }

  // GET all clinics 
  [HttpGet]
  public ActionResult<List<VetClinic>> GetAll() => 
          VetClinicService.GetAll();

  // GET clinic by Id 
  [HttpGet("{id}")]
  public ActionResult<VetClinic> Get(int id) 
  {
    var vetClinic = VetClinicService.Get(id); 

    if(vetClinic == null) 
      return NotFound();
    
    return vetClinic;
  }

  // POST new clinic 

  // PUT existing clinic 

  // DELETE clinic 
}