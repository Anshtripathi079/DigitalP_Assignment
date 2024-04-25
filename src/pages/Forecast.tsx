import LeftCards from "../components/Cards/LeftCards";
import RightCards from "../components/Cards/RightCards";
import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import CurrentLocation from "../components/CurrentLocation";

const Forecast = () => {
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const [forecastData, setForeCastData] = useState<any>("");
  const [city, setCity] = useState<string>("");
  // const { city, latitude = "", longitude = "" } = useParams();
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState<any>();
  const [error, setError] = useState<boolean>(false);
  const fetchForecastData = async () => {
    try {
      if (city) {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=89187f0172415e3f0d994eca5c595f38&units=metric`
        );

        const jsonData = await res.json();
        setForeCastData(jsonData);
      }
    } catch (err) {
      // console.log(err)
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        if (city) {
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=814c74ca48d75b9ca4905f813252e8a4&units=metric`
          );

          if (res.status === 404) {
            setError(true);
          }

          const jsonData = await res.json();
          setData(jsonData);
        }
        setLoading(false);
      } catch (err) {
        // console.log(err);
      }
    };

    fetchData();
  }, [city]);

  useEffect(() => {
    fetchForecastData();
  }, [city]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setCity(search);
      setSearch("");
    }
  };

  return (
    <>
      {loading ? (
        <div className="h-screen flex items-center justify-center">
          <HashLoader color="#36d7b7" size={80} />
        </div>
      ) : (
        <>
          {error ? (
            navigate("/error")
          ) : (
            <div className="p-4 overflow-hidden">
              <div className="flex flex-col justify-between items-center md:flex-row">
                <div className="flex justify-between w-full flex-col md:flex-row items-center gap-6 md:gap-0">
                  <div className="flex md:gap-2 justify-center items-center">
                    <img
                      src="https://static.vecteezy.com/system/resources/previews/011/029/459/original/blue-water-drop-for-symbol-design-png.png"
                      alt="Logo"
                      className="w-12"
                    />
                    <Link to="/">
                      <span className="text-xl font-semibold">
                        DigitalPaani.Weather
                      </span>
                    </Link>
                  </div>
                  <CurrentLocation setCity={setCity} />
                  {city && (
                    <div>
                      <div className="mr-6 bg-[#2b282e] rounded-lg w-[250px] lg:w-[300px] xl:w-[600px] max-w-[600px] shadow-sm flex items-center p-3 relative">
                        <input
                          type="text"
                          placeholder="Search place"
                          className="bg-transparent border-none focus:outline-none mr-2 w-full"
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          onKeyDown={(e) => handleKeyDown(e)}
                        />
                        <span>
                          <FaSearch
                            onClick={() => {
                              setCity(search);
                              setSearch("");
                            }}
                          />
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Forecast Cards */}
              <div>
                {city ? (
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-9 lg:grid-cols-11 xl:grid-cols-12 gap-14 p-4">
                    {/* Left Section */}
                    <LeftCards
                      data={data}
                      forecastData={forecastData}
                      city={city}
                    />
                    {/* Right Section */}

                    <RightCards data={data} forecastData={forecastData} />
                  </div>
                ) : (
                  <div className="flex h-[60vh] md:h-[80vh] justify-center items-center flex-col gap-6">
                    <div className="text-3xl">Enter City Name</div>
                    <div className="mr-6 bg-[#2b282e] rounded-lg w-[250px] lg:w-[300px] xl:w-[600px] max-w-[600px] shadow-sm flex items-center p-3 relative">
                      <input
                        type="text"
                        placeholder="Search place"
                        className="bg-transparent border-none focus:outline-none mr-2 w-full"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e)}
                      />
                      <span>
                        <FaSearch
                          onClick={() => {
                            setCity(search);
                            setSearch("");
                          }}
                        />
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Forecast;
