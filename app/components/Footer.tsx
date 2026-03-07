const Footer = () => {
  return (
    <div className="footerWrapper">
      <div className="footer flexcol text-center items-center bg-off-background  py-4">
        <div className="">
          <p className="text-text text-sm">
            Developed by:{" "}
            <a
              href="https://about-me-five-beta.vercel.app"
              target="_blank"
              referrerPolicy="no-referrer"
              className="text-text-alt hover:text-hover"
            >
              Tommy Evertsen
            </a>{" "}
          </p>
        </div>
        <div>
          <p className="text-text text-xs mt-1">
            Api by:{" "}
            <a
              href="https://api.nasa.gov/"
              target="_blank"
              referrerPolicy="no-referrer"
              className="text-text-alt hover:text-hover"
            >
              NASA Space agency
            </a>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
