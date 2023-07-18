import React from "react";
import { Col, Row } from "react-bootstrap";

const TopCards = () => {


  const mockData : any[] = [
    {
      "id": 1,
      "title": "The Brain",
      "percentage": 48
    }, {
      "id": 2,
      "title": "Flock, The",
      "percentage": 57
    }, {
      "id": 3,
      "title": "Wild Party, The",
      "percentage": 75
    }, {
      "id": 4,
      "title": "Lower Depths",
      "percentage": 24
    }, {
      "id": 5,
      "title": "Bab'Aziz",
      "percentage": 94
    }
  ]

  // TODO: add a method to calculate percentage change from the last period

  // Period lists

  return (
    <div className="grid gap-4 p-4 lg:grid-cols-5">
      <Row>
        {mockData.map((item, index) =>{
          return(
            // <div key={item.id} className="bg-white rounded-lg shadow-lg">
            //   <div className="p-4">
            //     <h2 className="text-xl font-bold text-gray-800">
            //       {item.title}
            //     </h2>
            //     <p className="text-gray-600">
            //       {item.percentage}
            //     </p>
            //   </div>
            // </div>
            <Col key={index}>
                <div  className="col-span-1 flex w-full justify-between rounded-lg border bg-white p-4 lg:col-span-2">
                <div className="flex w-full flex-col pb-4">
                  <p className="text-gray-700">{item.title}</p>
                  {/* <p className="text-2xl font-bold">{item.title}</p> */}
                  
                </div>
                <p className="my-1 flex min-w-[55px] items-center justify-center rounded-lg bg-blue-200 p-2 font-semibold">
                  <span>+{item.percentage}%</span>
                </p>
              </div>
            </Col>

              
          )
        
        })}
      </Row>
    
      
    </div>
  );
};

export default TopCards;