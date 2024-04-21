import { useState } from "react";
import {useRouter} from  "next/navigation";
import Image from "next/image";
import axios from "axios";
import PhoneInput from "react-phone-number-input";
import { CgSpinner } from "react-icons/cg";
import { UseData } from "@/app/Context/DataContext";
import { useRef } from "react";
import "react-phone-number-input/style.css";
import avatar from "../../../../../public/icons/avatar.svg";
import { Autocomplete, useJsApiLoader} from "@react-google-maps/api";


const libraries = ['drawings', 'places']



function ProfileForm() {
    const router = useRouter();
    const {UserInfo}=UseData();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("Ghana");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBqzAii2elbjBCmgYLRUpOPp0qrpyibEOo",
    libraries
});

 const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
  };

 const uuid = UserInfo?.data.uuid;

 const UpdateUserProfile = async () => {

    try{
        setLoading(true);
        const cookieRow = document.cookie
        .split(";")
        .find((row) => row.startsWith ("access_token"));
        const accessToken = cookieRow ? cookieRow.split("=")[1]:null;

        if (accessToken) {
            await axios.put(
                `${APIU_BASE}/users/update/${uuid}`,
                {
                    location,
                    address,
                    phone_number: phoneNumber,
                },
                {
                    headers:{
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            router.push("/dashboard/onboarding");
        }else{
            console.error("no access token found in cookies.");
        }
    }catch (error){
        console.error("error updating user data", error);
    }finally {
        setLoading(false);
    }
    };
    if (!isloading) {
        return <></>;
    }


  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-10 mb-10 mt-10">
        <Image src={avatar} width={100} height={200} alt="avatar" />
        <input
          className="hidden"
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        <button
          onClick={handleUploadClick}
          className="bg-[#eff7ff] text-[#00458d] p-4 rounded-xl hover:opacity-80"
        >
          Upload picture
        </button>
      </div>

      <p className="mb-2"> Phone Number </p>
      <PhoneInput
        international
        countryCallingCodeEditable={true}
        className="border-2 rounded-xl p-4 focus-outline-none"
        placeholder="Enter phone number"
        defaultCountry="GH"
        value={phoneNumber}
        onChange={setPhoneNumber}
      />

      <p className="mt-2 mb-2"> Location</p>
      <select
        className="p-4 w-full border-2 border-gray-200 bg-white focus:border-primary focus:ring-[3px] 
            focus:outline-none rounded-xl"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      >
        <option value="Ghana">Ghana</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>

      <p className="mt-2 mb-2"> Address </p>
      <div className="flex relative items-center">
        <Autocomplete className="w-full">
          <input
            placeholder="Type your location"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border-2 border-gray-200 p-4 rounded-xl w-full focus:border-primary 
                             focus:ring-[3px] focus:outline-none "
          />
        </Autocomplete>
        <Image
          className="absolute right-0 mx-1"
          src={"/icons/location.svg"}
          width={30}
          height={40}
          alt="location"
        />
      </div>

      <p className="mt-4 text-[#6a6e73] ">
        {" "}
        The location at which the service is required{" "}
      </p>
      <div className="flex flex-row gap-2">
        <div className="mt-10 w-full flex justify-center  sm:justify-items-end sm:p-10  relative">
          <div className="relative sm:absolute  right-0 bottom-5 flex flex-col sm:flex-row gap-3 w-full sm:w-3/3 ">
            <button
              onClick={() => router.push("/dashboard/onboarding")}
              className="bg-[#eff7ff] px-10 py-4 text-[#00458d] rounded-xl hover:opacity-80"
            >
              Cancel
            </button>
            {loading ? (
              <button
                onClick={UpdateUserProfile}
                className={`bg-[#7fa2c6] px-[40px] w-full flex justify-center py-[16px] text-white hover:opacity-80 rounded-xl`}
              >
                <CgSpinner className="animate-spin" size={25} />
              </button>
            ) : (
              <button
                onClick={() => {
                  if (phoneNumber && phoneNumber.length > 0 && address) {
                    UpdateUserProfile();
                  }
                }}
                className={`${phoneNumber && phoneNumber.length > 0 && address
                  ? "bg-primary hover:opacity-80"
                  : "bg-[#7fa2c6] hover:cursor-not-allowed"
                  } px-10 py-4 w-full text-white rounded-xl`}
              >
                Save and proceed.
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileForm;















        
  


