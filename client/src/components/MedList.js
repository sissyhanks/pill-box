import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Medtable from "./Medtable";

export default function MedList() {

    const [ title, setTitle ] = useState('');
    const [ morning, setMorning ] = useState('false');
    const [ afternoon, setAfternoon ] = useState('false');
    const [ evening, setEvening ] = useState('false');
    const [ night, setNight ] = useState('false');
    const [ as_needed, setAsNeeded] = useState('false');

    const handleInputChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
    

    const handlenewMedSubmit = async (event) => {
        event.preventDefault();

        try{
            const medicineData = {
                title,
                morning,
                afternoon,
                evening,
                night,
                as_needed,
            }
           
            await axios.post(
                "http://localhost:3001/api/users/saveMed",
                medicineData
              );
             
            } catch (err) {
              console.error(err);
            }
          };
    

    const [medications, setMedications] = React.useState([])
    const [medlist, getMedList] = useState('');

    useEffect(() => {
        getData()
        getUserData();
    }, [])

    const getData = async () => {
        setMedications()
        
    }

    const getUserData = () => {
        axios.get("http://localhost:3001/api/users/getSingleUser")
        .then((response) => {
            const medlist = response.data.medList
            console.log(medlist)
            getMedList(medlist);
        })
        .catch(error => console.log(error));
      }
          

    const renderHeader = () => {
        let headerElement = ['id', 'title', 'morning', 'afternoon', 'evening', 'night', 'as needed']

        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    const renderForm = () => {
        return(
            <div>
            <form onSubmit={handlenewMedSubmit} className="row g-3">
                
                <label for="title" className="form-label">Medication Name</label>
                <input type="text"  className="form-label-inline" id="title" onChange={(e) => setTitle(e.target.value)} value={title} />
                
                
                <label for="setMorning" className="form-check-inline"></label>
                <input type="checkbox"  className="form-check-inline" id="setMorning" onChange={(e) => setMorning(e.target.checked)} value={morning} />
                
                <label for="setAfternoon" className="form-check-inline"></label>
                <input type="checkbox"  className="form-check-inline" id="setAfternoon" onChange={(e) => setAfternoon(e.target.checked)} value={afternoon} />
                
                <label for="setEvening" className="form-check-inline"></label>
                <input type="checkbox"  className="form-check-inline" id="setEvening" onChange={(e) => setEvening(e.target.checked)} value={evening} />
                
                
                <label for="inputEmail4" className="form-check-inline"></label>
                <input type="checkbox"  className="form-check-inline" id="setNight" onChange={(e) => setNight(e.target.checked)} value={night} />
                
                
                <label for="setAsNeeded" className="form-check-inline"></label>
                <input type="checkbox"  className="form-check-inline" id="setAsNeeded" onChange={(e) => setAsNeeded(e.target.checked)} value={as_needed} />
                
                  <div className="col-12">
                    <button className="btn btn-outline-info" type="submit">
                add med
              </button>

              </div>
            </form>
            </div>
        )}

  
  

    
    

    return (
        <>
            <h1 id='title'>Your Medication List</h1>
            
            <table className='table table-striped'>
                <thead>
                    <tr>{renderHeader()}</tr>
                    
                </thead>
                <tbody>
                
                
                    {/* {renderList()} */}
                </tbody>
                <tr>{renderForm()}</tr>
            </table> 
            <Medtable medlist={medlist}/>
        </>
        
    )
};