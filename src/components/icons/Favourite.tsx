const Favourite = ({ ...props }) => {
  const onClickFavouriteHandler = () => {
    alert("Clicked on Favourite.");
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 381.247 381.247"
      style={{ cursor: "pointer" }}
      xmlSpace="preserve"
      onClick={onClickFavouriteHandler}
      {...props}
    >
      <path d="M191.847 360.957a17.898 17.898 0 0 1-12.447-5.024c-.245-.233-29.256-28.289-146.439-145.472l-.817-.817a36.536 36.536 0 0 1-2.387-2.572C10.621 186.384 0 159.48 0 131.483 0 70.173 49.883 20.29 111.193 20.29c30.091 0 58.672 12.113 79.425 33.444 20.759-21.332 49.346-33.444 79.437-33.444 61.31 0 111.193 49.883 111.193 111.193 0 30.723-12.31 59.305-34.673 80.535-.328.382-.627.686-.847.901C227.6 331.045 205.195 355.002 204.98 355.229c-3.288 3.514-7.9 5.597-12.674 5.716l-.459.012zM111.199 32.23c-54.734 0-99.259 44.525-99.259 99.259 0 24.983 9.499 49.012 26.744 67.664.585.674 1.002 1.164 1.886 2.041l.835.835C158.552 319.177 187.413 347.084 187.67 347.334a6.006 6.006 0 0 0 4.135 1.695l.251-.006c1.557-.042 3.109-.74 4.207-1.915.173-.191 22.764-24.339 141.009-142.584l.859-.925c20.114-18.969 31.195-44.578 31.195-72.104 0-54.734-44.525-99.259-99.259-99.259-28.862 0-56.166 12.477-74.914 34.238l-4.523 5.245-4.523-5.251c-18.742-21.761-46.041-34.238-74.908-34.238z" />
    </svg>
  );
};

export default Favourite;
