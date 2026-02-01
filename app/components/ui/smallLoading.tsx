import React from 'react'

const SmallLoading = () => {
    return (
        <div className="animate-spin inline-block size-6 border-3 border-current border-t-transparent rounded-[999px] text-muted-foreground" role="status" aria-label="loading">
            <span className="sr-only">Loading...</span>
        </div>
    )
}

export default SmallLoading