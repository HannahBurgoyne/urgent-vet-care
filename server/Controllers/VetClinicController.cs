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
  [HttpPost]
  public IActionResult Create(VetClinic vetClinic)
  {
    VetClinicService.Add(vetClinic); 
    return CreatedAtAction(nameof(Get), new { id = vetClinic.Id}, vetClinic);
  }

  // PUT existing clinic 
  [HttpPut("{id}")]
  public IActionResult Update(int id, VetClinic vetClinic)
  {
    if (id != vetClinic.Id)
      return BadRequest(); 

    var existingClinic = VetClinicService.Get(id); 
    if (existingClinic is null)
        return NotFound(); 

    VetClinicService.Update(vetClinic);

    return NoContent(); 
  }
  

  // DELETE clinic 
  [HttpDelete("{id}")]
  public IActionResult Delete(int id) 
  {
    var vetClinic = VetClinicService.Get(id); 

    if (vetClinic is null)
        return NotFound(); 

    VetClinicService.Delete(id); 

    return NoContent();
  }
}