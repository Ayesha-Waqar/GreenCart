 import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { useAppContext } from '../Context/AppContext';
import toast from 'react-hot-toast';
// Reusable Input Component
const InputField = ({ type, name, placeholder, onChange, address }) => (
  <input
    type={type}
    name={name}
    placeholder={placeholder}
    onChange={onChange}
    value={address[name]}
    className="w-full border border-gray-300 p-2 rounded-md outline-none focus:border-primary transition"
    required
  />
);

const AddAddress = () => {
  const { navigate ,axios  ,user} = useAppContext();

  // State initialized from your image
  const [address, setAddress] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/address/add",
        { address }
      );
      console.log(data)
      if (data.success) {
        toast.success(data.message);
        navigate('/cart')
      }
      else{
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
   
  };

  useEffect(()=>{
    if(!user){
      console.log(" address page : user not logged in ")
navigate('/cart')
    }
  },[])

  return (
    <div className="flex flex-col md:flex-row items-start justify-center py-16 px-6 max-w-6xl mx-auto gap-12">
      <div className="w-full md:max-w-lg">
        <h2 className="text-3xl font-medium mb-8">
          Add Shippidhjffgfgfng <span className="text-primary">Address</span>
        </h2>

        <form onSubmit={formSubmitHandler} className="space-y-4 text-gray-700">
          <div className="flex gap-3">
            <InputField type="text" name="firstName" placeholder="First Name" onChange={handleChange} address={address} />
            <InputField type="text" name="lastName" placeholder="Last Name" onChange={handleChange} address={address} />
          </div>

          <InputField type="email" name="email" placeholder="Email Address" onChange={handleChange} address={address} />
          <InputField type="text" name="street" placeholder="Street" onChange={handleChange} address={address} />

          <div className="flex gap-3">
            <InputField type="text" name="city" placeholder="City" onChange={handleChange} address={address} />
            <InputField type="text" name="state" placeholder="State" onChange={handleChange} address={address} />
          </div>

          <div className="flex gap-3">
            <InputField type="text" name="zipcode" placeholder="Zipcode" onChange={handleChange} address={address} />
            <InputField type="text" name="country" placeholder="Country" onChange={handleChange} address={address} />
          </div>

          <InputField type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} address={address} />

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-md mt-4 font-medium hover:bg-primary-dull transition active:scale-[0.98]"
          >
            Save Address
          </button>
        </form>
      </div>

      <div className="hidden md:block w-full max-w-md">
        <img 
          src={assets.add_address_iamge} 
          alt="Add Address Illustration" 
          className="w-full h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default AddAddress;