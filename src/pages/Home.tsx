import React, { useState } from "react";
import Button from "../components/Button";
import Select from "../components/Select";
import Input from "../components/Input";
import Heading from "../components/Heading1";
import Loader from "../components/Loader";
import useForm from "../useForm";

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

  const {formValues, handleBlur, handleChange, handleFocus, validateAllFields} = useForm({initialValues: {input: {value: "", error: ""}, difficulty: {value: "", error: ""}}, validations})

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
