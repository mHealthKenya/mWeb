// import AllSchedulesComponent from "@components/Schedule/all";
// import UsersByRoleComponent from "@components/Users/Role";
import AddSchedule from "@components/Schedule/add";
import AllSchedulesComponent from "@components/Schedule/all";
import UsersByRoleComponent from "@components/Users/Role";
import { baseURL } from "@config/axios";
import NAdminLayout from "@layout/NAdminLayout/NAdminLayout";
import useAllFacilities, { allFacilities } from "@services/locations/all";

import useAllSchedules from "@services/schedules/allschedules";
// import useAllSchedules, { allSchedules } from "@services/schedules/allschedules";
import useUsersByRole from "@services/users/by-role";
import axios from "axios";
import * as jwt from 'jsonwebtoken'
import { GetServerSideProps } from "next";
import nookies from 'nookies'
import { Users } from "src/helpers/enums/users.enum";
// const Schedule = ({}) => {
//   return <div>Schedule</div>;
// }

// export default Schedule


const ScheduleUsers = ({ facilities, mothers}: any) => {
  const {data} = useUsersByRole('Mother', mothers)
  console.log('Mother Data Here: ', data)
  // const {facilities } = useAllFacilities(facilities)
  // const mothers = useAllSchedules( mothers)
  

  return (
    <NAdminLayout>
      
        <AddSchedule facilities={facilities} mothers={data}/>
        <AllSchedulesComponent data={data}/>
        
        
    </NAdminLayout>
  )
}

export default ScheduleUsers

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx)

  const cookie = cookies['access-token']

  try {
    const user: any = await jwt.verify(cookie, `${process.env.NEXT_PUBLIC_JWT_SECRET}`)

    if (user.role !== Users.Admin) {
      return {
        redirect: {
          destination: '/login',
          permanent: false
        }
      }
    }

    const users = await axios
      .get(baseURL + 'users/roles?role=Mother', {
        headers: {
          Authorization: `Bearer ${cookie}`
        }
      })
      .then((res) => res.data)

    const data = await axios
    .get(baseURL + 'users/roles?role=Mother', {
      headers: {
        Authorization: `Bearer ${cookie}`
      }
    })
    .then((res) => res.data)

      const facilities = await allFacilities()
      // const mothers = await 

    return {
      props: {
        user,
        users,
        facilities,
        data
      }
    }
  } catch (error) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }
}
