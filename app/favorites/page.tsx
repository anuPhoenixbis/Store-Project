import SectionTitle from "@/components/global/SectionTitle";
import ProductsGrid from "@/components/products/ProductsGrid";
import { fetchUserFavorites } from "@/utils/actions"

export const dynamic = 'force-dynamic'

async function FavoritesPage() {
  const favorites = await fetchUserFavorites();
  if(favorites.length === 0){
    return <SectionTitle text="Don't you like anything around here? What's wrong with you?" />
  }
  return (
    <div>
      <SectionTitle text='Favorites'/>
      <ProductsGrid products={favorites.map((favorite)=>favorite.product)} />
    </div>
  )
}

export default FavoritesPage