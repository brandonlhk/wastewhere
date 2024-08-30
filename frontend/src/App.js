import logo from './images/wastewhere.png';
import {useState, useEffect} from "react";
import LoadingModal from "./components/loadingPage"
import Toast from "./components/Toast"

function App() {

  const [image, setImage] = useState(null)
  const [base64, setBase64] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [notRecyclableToast, setNotRecyclableToast] = useState(false);
  const [RecyclableToast, setRecyclableToast] = useState(false);
  
  //send data to backend once setBase64 is done
  useEffect(() => {
    if (base64) {
      classify(base64)
    }
  }, [base64])

  //allow user to upload images from 
  const uploadImage = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result)

        setBase64(reader.result.split(",")[1])
      }
      reader.readAsDataURL(file)

      setIsLoading(true)


      setTimeout(() => {
        setIsLoading(false)
        if (true) { //this is where the backend returns true or false
          setRecyclableToast(true)
        } else {
          setNotRecyclableToast(true)
        }

      }, 3000)
    }
  }

  // function to send image to classify
  const classify = async (encodedB64) => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({image: encodedB64})
      }

      const response = await fetch ("/classify", options)
      const data = await response.json();

      console.log(data)
      return data
    }
    catch (error) {
      console.error("Error uploading the image", error)
      return error
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-off-white">

      {/* Navbar */}
      <div className="navbar bg-green-600 shadow-sm">
        <button><img className="h-10" src={logo} alt="wastewhere logo"/></button>
      </div>

      {/* Card */}
      <div className="flex-grow flex justify-center items-center">

        <div className="card bg-white w-96 h-100 shadow-xl">

            <div className="card-body mt-3">
              
              <div className="flex justify-center flex-col items-center">
                {image ? (<img src={image} alt="user stuff" className="h-52 w-52"/>) : (<div className="skeleton h-52 w-52"></div>)}
              </div>
            
              <div className="card-actions mt-16 flex justify-between">
                <input type="file" className="file-input file-input-bordered w-56 max-w-xs" onChange={uploadImage}/>

                <label className="relative cursor-pointer inline-block">
                  {/* Hidden file input */}
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment" // Use 'user' for front camera
                    className="hidden"
                    onChange={uploadImage}
                  />
                  
                  {/* SVG Icon */}
                  <svg
                    className="svg-icon"
                    style={{ width: "52px", height: "52px", verticalAlign: "middle", fill: "currentColor", overflow: "hidden" }}
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M512 550m-115 0a115 115 0 1 0 230 0 115 115 0 1 0-230 0Z" fill="" />
                    <path d="M835 320H726c-9.2 0-17.8-4-24-10.8-56.8-63.6-78.2-85.2-101.4-85.2h-171c-23.4 0-46.4 21.6-103.4 85.4-6 6.8-14.8 10.6-23.8 10.6h-8.2v-16c0-8.8-7.2-16-16-16h-52c-8.8 0-16 7.2-16 16v16h-15C159.8 320 128 346.4 128 381.4v352c0 35 31.8 66.6 67 66.6h640c35.2 0 61-31.6 61-66.6v-352c0-35-25.8-61.4-61-61.4zM520 720.8c-100.6 4.6-183.4-78.2-178.8-178.8 4-87.8 75-158.8 162.8-162.8 100.6-4.6 183.4 78.2 178.8 178.8-4 87.8-75 158.8-162.8 162.8zM704 436c-14.4 0-26-11.6-26-26s11.6-26 26-26 26 11.6 26 26-11.6 26-26 26z" fill=""/>
                  </svg>
                </label>
                
              </div>
            </div>
        </div>
      </div>

      {/* Results */}
      <Toast message="It is not recyclable!" show={notRecyclableToast} onClose={() => setNotRecyclableToast(false)} color={"danger"} />
      <Toast message="It is recyclable!" show={RecyclableToast} onClose={() => setRecyclableToast(false)} color={"success"} />
      {/* Modal */}
      <LoadingModal isVisible={isLoading} />
    </div>
  );
}

export default App;
