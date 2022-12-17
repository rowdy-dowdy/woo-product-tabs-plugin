export default () => {
  return(
    <div className="shimmer">
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="!text-xl font-semibold py-4 w-60 h-6 bg-gray-200 rounded"></h1>
        <div className="mt-4">
          <div className="w-full bg-white rounded shadow p-4 space-y-4">
            <div className="w-1/3 h-20 bg-gray-200"></div>
            <div className="w-full h-10 bg-gray-200"></div>
            <div className="w-full h-20 bg-gray-200"></div>
            <div className="w-full h-20 bg-gray-200"></div>
          </div>
        </div>
      </div>
    </div>
  )
}