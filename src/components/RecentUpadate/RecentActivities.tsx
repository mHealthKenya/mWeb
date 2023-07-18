// import { mockData } from "@/mockData";
import { Badge } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";
// import { GiShoppingBag } from "react-icons/gi";

const RecentActivities = () => {

  const mockData: any[] = [
    {"id":1,"name":"Ashlen Baudi","total":"276","date":"11/6/2022"},
    {"id":2,"name":"Kaiser Cowdry","total":"460","date":"10/19/2022"},
    {"id":3,"name":"Victor Saull","total":"224","date":"3/8/2023"},
    {"id":4,"name":"Coleen Danbye","total":"2169","date":"5/7/2023"},
    {"id":5,"name":"Ethel Parradice","total":"561","date":"4/14/2023"},
    {"id":6,"name":"Jobie McDougle","total":null,"date":"10/22/2022"},
    {"id":7,"name":"Bradan Duetschens","total":"5230","date":"5/8/2023"},
    {"id":8,"name":"Ainslee Hartshorn","total":"-1266","date":"1/22/2023"},
    {"id":9,"name":"Cherilyn Querree","total":"2086","date":"7/10/2023"},
    {"id":10,"name":"Ase Tomaino","total":"1428","date":"6/5/2023"}
  ]

  return (
    <div className="relative col-span-1 m-auto h-[50vh] w-full overflow-scroll rounded-lg border bg-white p-4 lg:h-[70vh]">
      <h5>Recent Activities</h5>
      <ul>
      <ListGroup as="ul" numbered>
        {mockData.map((activity, id) => (
          
          <ListGroup.Item
            as="li"
            key={id}
            className="d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">{activity.name}</div>
                {activity.date}
            </div>
            <Badge bg="primary" pill>
              {activity.total}
            </Badge>
          </ListGroup.Item>
        ))}
        </ListGroup>
      </ul>
    </div>
  );
};

export default RecentActivities;