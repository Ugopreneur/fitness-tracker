import React, { useState, useEffect } from "react";
import axios from "axios";
// import 'bootstrap/dist/css/bootstrap.min.css';

const TeamHighlights = (props) => {
  const [youtubeResponse, setYoutubeResponse] = useState(null);

  console.log(`this is from team highlights: ${props.details.name}`);

  useEffect(() => {
    const fetchYoutubeData = async () => {
      const options = {
        method: 'GET',
        url: 'https://youtube138.p.rapidapi.com/search/',
        params: {q: props.details.name, hl: 'en', gl: 'US'},
        headers: {
          'X-RapidAPI-Key': 'd73fe9001amshc84a879808281a3p118f3ejsnc92bedc355cd',
          'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        console.log(response.data);
        setYoutubeResponse(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchYoutubeData();
  }, [props.details.name]);

  if (!youtubeResponse) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="col-md-6">
        <div
          className="card text-center mb-5"
          style={{
            borderRadius: "2px",
            background: "#C0C0C0",
            boxShadow: "rgba(128, 128, 128, 0.5) 1px 1px 1px 1px",
          }}
        >
          <div className="card-img-top embed-responsive embed-responsive-16by9">
            <iframe
              title={youtubeResponse.contents[0].video.title}
              className="embed-responsive-item"
              src={`https://www.youtube.com/embed/${youtubeResponse.contents[0].video.videoId}`}
              allowFullScreen
              width={"100%"}
            ></iframe>
          </div>
          <div className="card-body">
            {/* change the string  */}
            <h4 className="card-title">{youtubeResponse.contents[0].video.title}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamHighlights;
