import Link from "next/link"
export default function ProductsPage(){
    return(
<div>
    <h1>Featured Products</h1>
    <Link href="/products/1"> product 1</Link>
    <Link href="/products/2">product 2</Link>
    <Link href="/products/3">product 3</Link>
</div>
    )
}