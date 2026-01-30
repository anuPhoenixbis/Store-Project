
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '../ui/breadcrumb'

function BreadCrumbs({name}:{name:string}) {
  return (
    <Breadcrumb>
        <BreadcrumbList>
        {/* one item/breadcrumb */}
            <BreadcrumbItem>
                <BreadcrumbLink href='/' className='capitalize text-lg'>home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator/>
            <BreadcrumbItem>
                <BreadcrumbLink href='/products' className='capitalize text-lg'>products</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator/>
            <BreadcrumbItem>
                <BreadcrumbLink className='capitalize text-lg'>{name}</BreadcrumbLink>
            </BreadcrumbItem>
        </BreadcrumbList>
    </Breadcrumb>
  )
}

export default BreadCrumbs