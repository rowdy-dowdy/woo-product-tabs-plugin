import { useState, useEffect, useContext } from "@wordpress/element";
import { useSelector, useDispatch } from 'react-redux'
import { saveSettings } from '../store/settings'
import { redirect } from "react-router-dom";
import { AppLocalizeContext } from "../App";
import Loading from "../components/loading";

export default () => {
  const appLocalizer = useContext(AppLocalizeContext)

  const settings = useSelector((state) => state.settings)
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([])

  useEffect(() => {
    const load = async () => {
      let temp_settings = settings

      if (!settings.consumer_key || !settings.consumer_secret) {
        await fetch(`${appLocalizer.apiURL}/wpt/v1/settings`)
          .then(res => res.json())
          .then(data => {
            if (!data.data.consumer_key || !data.data.consumer_secret) {
              throw new Error("error")
            }
            dispatch(saveSettings(data.data))

            temp_settings = data.data
          })
          .catch(e => redirect('/settings'))
      }

      await fetch(`${appLocalizer.apiURL}/wc/v3/products?consumer_key=${temp_settings.consumer_key}&consumer_secret=${temp_settings.consumer_secret}`)
        .then(res => res.json())
        .then(data => {
          setProducts(data)
        })
        .catch(e => console.log(e))

      setLoading(false)
    }

    load()
  }, [])

  return(
    <div className="w-full max-w-4xl mx-auto">
      <h1 className="!text-xl font-semibold py-4">Let's get you started 🚀</h1>
      <div className="mt-4">
        { loading 
        ? <Loading />
        : <div className="relative">
            <div className="w-full bg-white rounded shadow p-4 space-y-4">
              { products.length > 0 
              ? <div>
                  <a
                    href={`${appLocalizer.customizeURL}?url=${products[0].permalink}`}
                    className="inline-block px-8 py-4 bg-rose-600 hover:bg-rose-500 shadow rounded text-white text-base font-semibold"
                    target="_blank"
                  >
                    Go to Customize setting
                  </a>

                  <table className="mt-6 w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th scope="col" className="py-3 px-6">Image</th>
                        <th scope="col" className="py-3 px-6">Name</th>
                        <th scope="col" className="py-3 px-6">Price</th>
                        <th scope="col" className="py-3 px-6 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      { products.map((product, index) => {
                        return(
                          <tr className="bg-white border-b">
                            <td className="py-4 px-6">
                              <img className="w-20 h-20 object-fill " src={product.images.length > 0 ? product.images[0].src : ''} />
                            </td>
                            <td className="text-blue-500 font-semibold">{product.name}</td>
                            <td className="py-4 px-6" dangerouslySetInnerHTML={{__html: product.price_html}}></td>
                            <td className="py-4 px-6 w-0">
                              <a 
                                href={`${appLocalizer.customizeURL}?url=${product.permalink}`} 
                                target="_blank"
                                className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-400 text-white font-semibold"
                              >
                                Customize
                              </a>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              : <div className="text-xl">Can't find any products</div>
              }
            </div>
          </div>
        }
      </div>
    </div>
  )
}