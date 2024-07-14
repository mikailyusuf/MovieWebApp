import React, { useState, useEffect, createContext, useContext } from "react";

// Define the type for Cloudinary configuration
interface CloudinaryConfig {
  cloudName: string;
  uploadPreset: string;
  // Add more fields as per your Cloudinary widget config
}

// Define the type for UploadWidget props
interface UploadWidgetProps {
  uwConfig: CloudinaryConfig;
  setPublicId: (publicId: string) => void;
  setState: React.Dispatch<React.SetStateAction<string[]>>;
}

// Define the context type for CloudinaryScriptContext
interface CloudinaryScriptContextType {
  loaded: boolean;
}

// Create context with initial state
const CloudinaryScriptContext = createContext<CloudinaryScriptContextType>({
  loaded: false,
});

const UploadWidget = (uwConfig: any, setState: (data: any) => void) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Check if the script is already loaded
    if (!loaded) {
      const uwScript = document.getElementById("uw");
      if (!uwScript) {
        // If not loaded, create and load the script
        const script = document.createElement("script");
        script.setAttribute("async", "");
        script.setAttribute("id", "uw");
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.addEventListener("load", () => setLoaded(true));
        document.body.appendChild(script);
      } else {
        setLoaded(true);
      }
    }
  }, [loaded]);

  const initializeCloudinaryWidget = () => {
    if (loaded && window.cloudinary) {
      var myWidget = window.cloudinary.createUploadWidget(
        uwConfig,
        (error: any, result: any) => {
          if (!error && result && result.event === "success") {
            setState((prev: any) => [...prev, result.info.secure_url]);
          }
        }
      );

      document.getElementById("upload_widget")?.addEventListener(
        "click",
        function () {
          myWidget.open();
        },
        false
      );
    }
  };

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      <div 
        id="upload_widget"
        className="cloudinary-button"
        onClick={initializeCloudinaryWidget}
      >
        Uploads
      </div>
    </CloudinaryScriptContext.Provider>
  );
};

export default UploadWidget;

// Optional: Create a custom hook to consume CloudinaryScriptContext
export const useCloudinaryScript = () => useContext(CloudinaryScriptContext);
