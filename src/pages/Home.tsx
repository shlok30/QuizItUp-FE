import { Link, useNavigate } from 'react-router';
import Button from '../components/Button';
import Select from '../components/Select';
import Input from '../components/Input';
import Heading from '../components/Heading1';
import useForm from '../useForm';
import { useContext, useEffect } from 'react';
import { FileUploadContext } from '../context/FileUploadContext';

const options = [
  {
    id: 1,
    label: 'Easy',
  },
  {
    id: 2,
    label: 'Medium',
  },
  {
    id: 3,
    label: 'Hard',
  },
  {
    id: 4,
    label: 'Adaptive',
  },
];

const validations = constraint => ({
  input: [
    {
      name: 'Max Length',
      validation: (value: string) => !(value.length > 32),
      error: 'Max length of 32 characters allowed!',
    },
    {
      name: 'Required',
      validation: (value: string) =>
        constraint.file || Boolean(value.trim().length),
      error: 'This is a required field!',
    },
  ],
  difficulty: [
    {
      name: 'Required',
      validation: (value: string) => Boolean(value),
      error: 'This is a required field!',
    },
  ],
});

function App() {
  const { file, setFile } = useContext(FileUploadContext);

  useEffect(() => {
    setFile(null);
  }, []);

  const {
    formValues,
    handleBlur,
    handleChange,
    handleFocus,
    validateAllFields,
    resetField,
  } = useForm({
    initialValues: {
      input: { value: '', error: '' },
      difficulty: { value: '', error: '' },
    },
    validations: validations({ file }),
  });

  const navigate = useNavigate();

  const handleSubmit = () => {
    const errors = validateAllFields();
    if (!errors.length) {
      const topic = formValues.input.value.trim();
      const difficulty = formValues.difficulty.value;
      navigate(
        `/quiz?topic=${topic}&difficulty=${difficulty}&isFile=${Boolean(file)}`
      );
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0];
    if (selected) {
      setFile(selected);
      resetField('input');
    }
  };

  return (
    <div className="bg-background h-screen">
      <header className="flex relative justify-center p-8 flex-col items-center">
        <Link
          to="/history"
          className="absolute top-4 right-8 text-primary underline font-medium hover:text-secondary transition"
        >
          My Quizzes
        </Link>
        <img alt="Logo Img" src="Logo.png" className="w-50 h-50" />
      </header>
      <section className="flex justify-center items-center flex-col px-20 gap-6">
        <Heading
          customStyle="text-center"
          level={2}
          label="What do you want to be Quizzed on?"
        />
        <div>
          <Input
            onBlur={handleBlur}
            onFocus={handleFocus}
            error={formValues.input.error}
            name="input"
            value={formValues.input.value}
            onChange={handleChange}
            type="text"
            placeholder="Enter the subject"
            disabled={Boolean(file)}
            customStyle={`w-80 md:w-150 lg:w-200 ${
              file ? 'bg-gray-200 cursor-not-allowed' : ''
            }`}
          />
        </div>
        <p className="text-gray-500 font-medium">OR</p>
        <div className="flex flex-col gap-4 items-center w-80 md:w-150 lg:w-200">
          <label className="bg-secondary text-white px-4 py-2 rounded-lg cursor-pointer w-full text-center hover:bg-secondary/90 transition">
            Upload File
            <Input
              name="upload"
              type="file"
              accept=".pdf,.docx"
              customStyle="hidden "
              onChange={handleFileChange}
            />
          </label>
          {file && (
            <p className="text-sm text-gray-700">Selected: {file.name}</p>
          )}
        </div>
        <div>
          <Select
            onBlur={handleBlur}
            onFocus={handleFocus}
            value={formValues.difficulty.value}
            name="difficulty"
            error={formValues.difficulty.error}
            onChange={handleChange}
            options={options}
            placeholder="Select Difficulty"
          />
        </div>
        <Button
          label="Generate Quiz"
          customCallback={handleSubmit}
          customStyles="w-80 md:w-150  lg:w-200"
        />
      </section>
    </div>
  );
}

export default App;
