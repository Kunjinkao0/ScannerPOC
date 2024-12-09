import { useEffect, useState } from 'react';
import './App.css'
import CameraModal from './CameraModal';

const MOCK_DATA = {
  name: '张三',
  gender: 'male',
  dob: '1990-01-01',
  passportNumber: 'A12345678',
  nationality: '中国',
  issueDate: '2020-01-01',
  expiryDate: '2030-01-01',
  placeOfIssue: '北京',
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function PassportForm({ data }: any) {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    dob: '',
    passportNumber: '',
    nationality: '',
    issueDate: '',
    expiryDate: '',
    placeOfIssue: '',
  });


  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    data && setFormData(data)
  }, [data])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('提交的数据:', formData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6  shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">护照信息填写</h1>
      <form className="grid grid-cols-2 gap-6" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="name" className="text-sm font-medium text-gray-700 mb-1">
            姓名 (Name)
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="border-gray-300 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="请输入姓名"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="gender" className="text-sm font-medium text-gray-700 mb-1">
            性别 (Gender)
          </label>
          <select
            id="gender"
            value={formData.gender}
            onChange={handleChange}
            className="border-gray-300 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">请选择性别</option>
            <option value="male">男</option>
            <option value="female">女</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="dob" className="text-sm font-medium text-gray-700 mb-1">
            出生日期 (Date of Birth)
          </label>
          <input
            type="date"
            id="dob"
            value={formData.dob}
            onChange={handleChange}
            className="border-gray-300 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="passport-number" className="text-sm font-medium text-gray-700 mb-1">
            护照号码 (Passport Number)
          </label>
          <input
            type="text"
            id="passport-number"
            value={formData.passportNumber}
            onChange={handleChange}
            className="border-gray-300 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="请输入护照号码"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="nationality" className="text-sm font-medium text-gray-700 mb-1">
            国籍 (Nationality)
          </label>
          <input
            type="text"
            id="nationality"
            value={formData.nationality}
            onChange={handleChange}
            className="border-gray-300 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="请输入国籍"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="issue-date" className="text-sm font-medium text-gray-700 mb-1">
            签发日期 (Issue Date)
          </label>
          <input
            type="date"
            id="issue-date"
            value={formData.issueDate}
            onChange={handleChange}
            className="border-gray-300 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="expiry-date" className="text-sm font-medium text-gray-700 mb-1">
            到期日期 (Expiry Date)
          </label>
          <input
            type="date"
            id="expiry-date"
            value={formData.expiryDate}
            onChange={handleChange}
            className="border-gray-300 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="place-of-issue" className="text-sm font-medium text-gray-700 mb-1">
            签发地点 (Place of Issue)
          </label>
          <input
            type="text"
            id="place-of-issue"
            value={formData.placeOfIssue}
            onChange={handleChange}
            className="border-gray-300 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="请输入签发地点"
          />
        </div>

        <div className="col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-medium p-2 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            提交信息
          </button>
        </div>
      </form>
    </div>
  );
}


function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white">
        <PassportForm data={MOCK_DATA} />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-medium p-2 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          onClick={() => setIsModalOpen(true)}
        >
          开始扫描
        </button>

        <CameraModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </>
  )
}

export default App
