import { VetClinic } from '@/Models/Clinic'
import { useQuery } from '@tanstack/react-query'

export default function ClinicsList() {
  async function getAllClinics() {
    try {
      const res = await fetch('http://localhost:5141/vetclinic/')
      const data = await res.json()
      console.log('response', data)
      return data as VetClinic[]
    } catch (error) {
      console.error('Fetch error:', error)
    }
  }

  const { data } = useQuery({
    queryKey: ['clinics'],
    queryFn: () => getAllClinics(),
  })

  return (
    <>
      <h1>List</h1>
      {data &&
        data.map((clinic) => (
          <div style={{ border: 'black solid' }}>
            <p key={clinic.id}>{clinic.name}</p>
            <p>{clinic.address}</p>
          </div>
        ))}
    </>
  )
}
