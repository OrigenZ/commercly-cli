import CheckOutCart from "../../components/CheckOutCart/CheckOutCart"

const CheckOutPage = () => {
  return (
    <div className="section container text-center">
      <CheckOutCart />
    </div>
  )
  // TODO: Añadir más elementos al check out ( precio total con/sin IVA, metodos/precio/datos de envío... )
}

export default CheckOutPage
