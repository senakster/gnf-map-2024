import m1 from '../_libs/_data/denmark-municipalities.json'  assert { type: "json" }
import m2 from '../_libs/_data/kommuner-m2.geojson.json' assert { type: "json" }

export function test () {
    // console.log(m1.features.map(f => f.properties.name))
const offset = {
    x: -2.5,
    y: 1.5
}
const moveBornholm = {
    ...m2, features: [...m2.features.map(k => {
            if (k.properties.KOMNAVN === 'Bornholm') {
                return { ...k, geometry: { ...k.geometry, coordinates: k.geometry.coordinates.map(carr => carr.map(c => [Number(c[0]) + offset.x, Number(c[1]) + offset.y, c[2]])) } }
            } else {
                return k
            }
        })]
    }
    const newJSON = m1.features.map(
        m1f => ({
            name: m1f.properties.name, coordinates: moveBornholm.features.filter(
            m2f => m1f?.properties.name.startsWith(m2f.properties.KOMNAVN) || m1f.properties.name.startsWith(m2f.properties.KOMNAVN.replace(' ', '-'))
        ).map(
            m2f2 => m2f2.geometry.coordinates
        )})
    )

    const replaceCoordinates = {
        ...m1,
        features: [
            ...m1.features.map(
                k => ({ ...k, 
                    geometry: { 
                    ...k.geometry, 
                    coordinates: newJSON.find(nj => nj.name === k.properties.name)?.coordinates
                }}))
            ]}
    // [...new Set(m2.features.map(f => f.properties.KOMNAVN))]
    //     .map(m2f => m1.features.find(m1f => m1f?.properties.name.startsWith(m2f) || m1f.properties.name.startsWith(m2f.replace(' ','-'))))
    

    // console.log(m1.features.map(f => f.geometry.coordinates.flat(3).length))
    // console.log(replaceCoordinates.features.map(f => f.geometry.coordinates.flat(4).length))
    return replaceCoordinates
}