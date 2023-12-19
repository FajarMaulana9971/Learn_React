import { useEffect, useState } from "react";

const Products = () => {
  const url = "https://fakestoreapi.com/products";
  const [products, setProducts] = useState([]);
  // mendefinisikan dulu select product lalu tampilkan
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [showModal, setShowedModal] = useState(false);

  // async merupakan kata kunci yang memberitahu js bahwa fungsi tersebut akan membutuhkan waktu (dikarenakan mengambil data) dan memungkinkan data akan terus berjalan tanpa menunggu hasilnya terlebih dahulu
  // async dengan arrow function ini berfungsi seperti menunjukan bahwa function tersebut akan membutuhkan waktu. ambil data dulu, jalankan semua yang ada dibawahnya baru tampilkan

  const getDataProducts = async () => {
    // lakukan pengambilan data menggunakan fetch dan await (tunggu proses hingga selesai sebelum melakukan ke tahap berikutnya)
    const response = await fetch(url);
    // lakukan perubahan nilai dari response ke json lalu await
    const dataProduct = await response.json();
    // setProducts dengan nilai dataProduct dan nantinya disimpan ke products di xline 5
    setProducts(dataProduct);
  };
  // jadi ibarat getDataProducst itu dijalankan apabila semua proses response, dataProduct itu telah selesai

  // parameter nya product
  const showProductDetail = (product) => {
    setSelectedProducts(product);
    setShowedModal(true);
  };

  // useEffect ini merupakan sebuah fungsi yang akan dijalankan pertama kali ketika user masuk ke wesbite tersebut
  useEffect(() => {
    // lalu useEffect ini akan memanggil getDataProducts
    getDataProducts();
    // dikarenakan ada array kosong di akhir, maka useEffect ini akan dijalankan sekali ketika user masuk
    // array kosong ini dibuat agar tidak terjadi infinity looping
  }, []);
  return (
    <div className="containe">
      <div className="row">
        <h1 className="text-center p-5">
          Our <span style={{ color: "#6096B4" }}>Products</span>{" "}
        </h1>
        {/* me looping data products dan memberikan nilai sehingga dapat ditampilkan(iterasi) */}
        {products.map((product) => {
          return (
            <div className="col-3 pb-2 gap-3" key={product.id}>
              <CardProducts
                key={product.id}
                title={product.title}
                price={product.price}
                category={product.category}
                description={product.description}
                img={product.image}
                onDetailClick={() => showProductDetail(product)}
              />
            </div>
          );
        })}
        {/* dibawah ini adalah tenary operation dimana apabila selectedProducts memiliki nilai yang tepat (bukan null, unidenifeid, 0), maka jalankan dari kurung buka tutup setelah && */}
        {/* kodingan dibawah bisa juga seperti ini : 
        {selectedProducts ? (
          <ProductsDetail
              product={selectedProducts}
              onClose={() => {
              // Function to close the product detail modal
                setSelectedProducts(null);
                setShowedModal(false);
            }}
          showModal={showModal}
          />
        ) : (
        // If selectedProducts is falsy (null, undefined, 0, false, etc.), display a message or handle the case differently
        <p>Please select a product</p>
        )}  
        */}
        {selectedProducts && (
          <ProductsDetail
            product={selectedProducts}
            onClose={() => {
              setSelectedProducts(null);
              setShowedModal(false);
            }}
            showModal={showModal}
          />
        )}
      </div>
    </div>
  );
};

// nama function harus diawali huruf besar. tadi tuh dia ga mau masuksoale huruf kecil
function CardProducts(props) {
  return (
    <div style={{ height: "100%" }}>
      <div
        className="card mb-3"
        data-aos="fade-down"
        style={{ height: "100%", display: "flex", flexDirection: "column" }}
      >
        <img
          src={props.img}
          className="card-img-top"
          alt="Product"
          style={{ objectFit: "cover", height: "300px" }}
        />
        <div className="card-body badan d-flex flex-column">
          <h5 className="card-title text-center">{props.title}</h5>
          <p className="card-text text-center">{props.category}</p>
          {/* <p className="card-text" style={{ textAlign: "justify" }}>
            {props.description}
          </p> */}
          <p className="card-text text-center">price : {props.price} $</p>
          <button
            href=""
            className="btn btn-custom mt-auto"
            onClick={props.onDetailClick}
          >
            Detail about this {props.category}
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductsDetail(props) {
  return (
    <div
      className={`modal ${props.showModal ? "show" : ""}`}
      tabIndex="-1"
      role="dialog"
      style={{ display: `${props.showModal ? "block" : "none"}` }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{props.product.title}</h5>
          </div>
          <div className="modal-body">
            <p>{props.product.description}</p>
            <p className="text-center">price : {props.product.price}$</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={props.onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
