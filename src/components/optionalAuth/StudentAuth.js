import React, {useState} from 'react'
import "./StudentAuth.css"
import {useNavigate} from "react-router-dom"

// material-ui components
import Backdrop from "@material-ui/core/Backdrop"
import CloseIcon from "@material-ui/icons/Close"
import { IconButton, TextField, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core'


function StudentAuth() {

    const [open, setOpen] = useState(true)
    const [year, setYear]= useState("")
    const [course, setCourse] = useState("")
    const navigate = useNavigate()

    const closePage=()=>{
        navigate("/auth-option")
    }
    return (
        <Backdrop open={open} style={{zIndex:"1"}}>
        <div className="studnet">
            <div className="student-bio">
                <TextField label="student name" size="small" style={{ width:"20vw", marginLeft:"5px"}}/>
                <TextField label=" student number" size="small" style={{ width:"20vw", marginLeft:"5px"}}/>
                
                <FormControl style={{width:"120px", marginLeft:"5px"}}>
               <InputLabel id="select-year"> year of study</InputLabel> 
                <Select labelId="select-year"
                    value={year}
                    onChange={(e)=>setYear(e.target.value)}
                >
                    <MenuItem value={1}> one</MenuItem>
                    <MenuItem value={2}> two</MenuItem>
                    <MenuItem value={3}> three</MenuItem>

                </Select>
                </FormControl>
                <FormControl style={{width:"250px", marginLeft:"5px"}}>
               <InputLabel id="select-course">course </InputLabel> 
                <Select labelId="select-course"
                    value={course}
                    onChange={(e)=>setCourse(e.target.value)}
                >
                    <MenuItem value="BIST"> BIST</MenuItem>
                    <MenuItem value="COMPUTER SCIENCE"> COMPUTER SCIENCE</MenuItem>
                    <MenuItem value="SOFTWARE ENGINEERING"> SOFTWARE ENGINEERING</MenuItem>

                </Select>
                </FormControl>
                
            </div>
            <div className="student-close">
            <IconButton onClick={closePage}>
                <CloseIcon color="secondary"/>
            </IconButton>
            </div>
        </div>
        </Backdrop>
    )
}

export default StudentAuth
