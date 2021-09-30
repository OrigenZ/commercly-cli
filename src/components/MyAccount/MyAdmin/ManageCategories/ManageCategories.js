// ¿ User data con addresses?
// import { useContext } from "react"
// import { AuthContext } from "../../../common/context/auth.context"

import NewCategory from '../../../NewCategory/NewCategory'
import CategoriesListAdmin from './CategoriesListAdmin/CategoriesListAdmin'

function ManageCategories() {
  return (
    <div className="section">
      <CategoriesListAdmin />
      <NewCategory /> {/* TODO: cambiarlo de lugar */}
    </div>
  )
}

export default ManageCategories
