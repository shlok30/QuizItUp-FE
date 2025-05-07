import React, { useState } from "react";
import Button from "../components/Button";
import Select from "../components/Select";
import Input from "../components/Input";
import Heading from "../components/Heading1";
import Loader from "../components/Loader";

const options = [
  {
    id: 1,
    label: "Easy"
  },
  {
    id: 2,
    label : "Medium"
  },
  {
    id: 3,
    label: "Hard"
  },
  {
    id: 4,
    label : "Adaptive"
  }
];

const validations = {
  input: [
    {
      name: "Max Length",
      validation: (value: string) => !(value.length > 32),
      error: "Max length of 32 characters allowed!"
    },
    {
      name: "Required",
      validation: (value: string) => Boolean(value.length),
      error: "This is a required field!"
    }
  ],
  difficulty: [
    {
      name: "Required",
      validation: (value: string) => Boolean(value),
      error: "This is a required field!"
    }
  ]
};




function App() {

  const [isLoading, setIsLoading] = useState(false);

  const [formValues, setFormValues] = useState({input: {value: "", error: ""}, difficulty: {value: "", error: ""}});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const name = e.target.name as "input" | "difficulty"
    setFormValues(prevState => ({...prevState, [name] : {...prevState[name], value: e.target.value,}}))
  }

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const name = e.target.name as "input" | "difficulty"
    const value = e.target.value;
    const validationsToRun = validations[name];
    for(const {validation, error} of validationsToRun){
      if(!validation(value)){
        setFormValues(prevState => ({...prevState, [name] : {...prevState[name], error}}));
        break;
      }
    }
  }

  const handleFocus = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const name = e.target.name as "input" | "difficulty"
    setFormValues(prevState => ({...prevState, [name] : {...prevState[name], error: ""}}));
  }

  const validateAllFields = () : string[] => {
    const fields = Object.keys(formValues) as ("input"|"difficulty")[];
    const updatedValues = {...formValues};
    const errors : string[] = [];
    fields.forEach(field => {
      const validationsToRun = validations[field];
      const value = formValues[field].value;
      let error = ''
      for(const {validation, error : e} of validationsToRun){
        if(!validation(value)){
          error = e;
          errors.push(e);
          break;
        }
      }
      updatedValues[field] = {...updatedValues[field], error};
    });
    setFormValues({...updatedValues});
    return errors;
  }

  const handleSubmit = () => {
    validateAllFields();
    // setIsLoading(true);
  }

  if(isLoading)
    return (
      <div className="h-screen bg-background flex justify-center items-center">
        <div className="flex flex-col items-center gap-4">
          <Loader />
          <p className="font-semibold text-2xl">Your Quiz is Loading</p>
        </div>
      </div>
    )

  return (
    <div className='bg-background h-screen'>
      <header className="flex justify-center p-8 flex-col items-center">
        <img alt="Logo Img" src="Logo.png" className="w-32 h-32"/>
        <Heading label="Quiz App" />
      </header>
      <section className="flex justify-center items-center flex-col p-20 gap-6">
        <Heading customStyle="text-center" level={2} label="What do you want to be Quizzed on?"/>
        <div>
          <Input onBlur={handleBlur} onFocus={handleFocus} error={formValues.input.error} name="input" value={formValues.input.value} onChange={handleChange} type="text" placeholder="Enter the subject"/>
        </div> 
        <div>
          <Select onBlur={handleBlur} onFocus={handleFocus} value={formValues.difficulty.value} name="difficulty" error={formValues.difficulty.error} onChange={handleChange} options={options} placeholder="Select Difficulty"/>
        </div>
        <Button label="Generate Quiz" customCallback={handleSubmit}/>
      </section>
    </div>
  )
}

export default App
