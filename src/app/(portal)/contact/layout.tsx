import React from 'react'
import PCate from '@/components/portal/PCate'

const CateLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="container mx-auto flex m-2 h-full">
            <div className="w-1/5 mr-2">
                <PCate />
            </div>
            <div className="w-4/5 h-full">{children}</div>
        </div>
    )
}

export default CateLayout
