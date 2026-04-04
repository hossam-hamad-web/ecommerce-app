import notFound from "../../assets/images/notFound.jpg";

export default function Notfound() {
  return (
    <>
      <div className="border mt-10 p-6 bg-blue-100">
        <img src={notFound} alt="" />
      </div>
    </>
  );
}
