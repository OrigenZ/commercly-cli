import ShoppingCart from '../../components/ShoppingCart/ShoppingCart'

const CheckOutPage = () => {
  return (
    <div className="section container text-center">
      <ShoppingCart />
    </div>
  )
  // TODO: Añadir más elementos al check out ( precio total con/sin IVA, metodos/precio/datos de envío... )
}

export default CheckOutPage
