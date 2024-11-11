import React from 'react'
// import ReactDOMServer from 'react-dom/server';
import config from '@/_libs/_config/config.json'
import { FeatureCollection } from 'geojson';
import { 
    // FeatureGroup, 
    LatLngBoundsExpression } from 'leaflet';
// import municipalitiesGeoJSON from '@/_libs/_data/denmark-municipalities.json'
// import municipalitiesGeoJSON from '@/_libs/_data/kommuner-m2.geojson.json'
import municipalitiesGeoJSON from '@/_libs/_data/GNF-municipalities.json'
// import { test } from '@/components/test.mjs'
// import { useTranslation } from 'react-i18next';
import { useMap, GeoJSON } from 'react-leaflet';
// import PopContent from './PopContent';


const GeoData: React.FC<{
    grupper: TGNFG[], attribution?: string, setModalContent: (data?: {
        municipality: string;
        groups: TGNFG[];
    }) => void}> = ({ grupper, attribution, setModalContent }) => {
        // return []
    // const { t, ready } = useTranslation('map');
    const [ ui, setUI ] = React.useState({
        municipality: false,
    })
    // const theme = useTheme() as DefaultTheme & {
    //     body: string,
    //     text: string,
    //     primaryColor: string,
    //     secondaryColor: string,
    //     primaryDarkColor: string,
    //     secondaryDarkColor: string,
    // }
    const theme = {
        textColor: 'rgba(40, 40, 40, 1)',
        bgColor: '#FFFFFF',
        primaryColor: '#1db954',
        secondaryColor: '#FACAC8',
        primaryDarkColor: '#1db954',
        secondaryDarkColor: '#16C7B8',
    }
        const gnfgreen: string = "#1db954"
        // const defaultFill = '#a1d100';
        const emptyColor = 'beige' || 'white';
        const defaultFill = theme.primaryColor || gnfgreen
        const highlightFill = theme.secondaryDarkColor || `dodgerblue` || theme.secondaryColor
        const mapStroke = theme.textColor || defaultFill
    // const mapStroke = defaultFill
    // const map = useMapEvents({
    //   click: (e) => {
    //     console.log(e)
    //   }
    // });
    const map = useMap()

    React.useEffect(() => {
        const bounds = (config.map.bounds.Denmark as LatLngBoundsExpression)
        map.setMaxBounds(bounds)
        // map.fitBounds(bounds)
        // map.setMinZoom(map.getZoom() - .5)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function getBboxFromCoords(event: L.LeafletMouseEvent) {
        const coords = event.target.feature.geometry.coordinates.flat().flat()
        // eslint-disable-next-line no-var
        var lats = []; var lngs = [];
        // eslint-disable-next-line no-var
        for (var i = 0; i < coords.length; i++) {
            lats.push(coords[i][1]);
            lngs.push(coords[i][0]);
        }
        // calc the min and max lng and lat
        // eslint-disable-next-line no-var
        var minlat = Math.min.apply(null, lats),
            maxlat = Math.max.apply(null, lats);
        // eslint-disable-next-line no-var
        var minlng = Math.min.apply(null, lngs),
            maxlng = Math.max.apply(null, lngs);

        // create a bounding rectangle that can be used in leaflet
        const bbox = [[minlat, minlng], [maxlat, maxlng]] as [[lat: number, lng: number], [lat: number, lng: number]];
        return bbox;
    }

    function fitBounds(bbox: [[lat: number, lng: number], [lat: number, lng: number]]) {
        map.fitBounds(bbox)
    }

    function kommuneClick(event: L.LeafletMouseEvent) {
        const { properties } = event.target.feature;
        const groups = grupper?.filter((gg) =>
            (properties.name || properties.KOMNAVN).toUpperCase().indexOf(gg.municipality.toUpperCase()) !== -1
        )
        setUI({
            ...ui,
            municipality: properties.name || properties.KOMNAVN
        })
        console.log('kommuneClick', properties)
        setModalContent({municipality: properties.name || properties.KOMNAVN, groups})
        fitBounds(getBboxFromCoords(event))
    }
    function mouseoverColor(event: L.LeafletMouseEvent) {
        // console.log(event.target.setStyle);
        event.target.setStyle({
            fillColor: highlightFill,
            fillOpacity: 1,
            weight: 5
        })
    }
    function mouseleaveColor(event: L.LeafletMouseEvent) {
        const groups = grupper?.filter((gg) =>
            (event.target.feature.properties.name || event.target.feature.properties.KOMNAVN).toUpperCase().indexOf(gg.municipality.toUpperCase()) !== -1
            // compare(gg.municipality, event.target.feature.properties.name)
        );
        event.target.setStyle({
            fillColor: groups.length > 0 ? defaultFill : emptyColor,
            fillOpacity: groups.length > 0 ? .5 + .1 * groups.length : 1,
            weight: 3
        })
    }

    /**
     * 
     * @param data {GEOJSON loop}
     * @param layer {Leaflet Layer}
     */
    function onEachMunicipality(data: {properties: {
        KOMNAVN?: string ;name?: string
}}, layer: L.Layer) {
        // Groups Matching Municipality
        const groups = grupper?.filter((gg) =>
            (data.properties.KOMNAVN || data.properties.name)?.toUpperCase().indexOf(gg.municipality.toUpperCase()) !== -1
        )
        //   gg.municipality.toUpperCase() === data.properties.name.toUpperCase() || 
        //   gg.municipality.toUpperCase() === `${data.properties.name.toUpperCase()} KOMMUNE` ||
        //   gg.municipality.toUpperCase() === `${data.properties.name.toUpperCase()}S KOMMUNE`
        // );


        // console.log(data, grupper);

        // groups.length > 0 && 
        // layer.bindPopup(ReactDOMServer.renderToString(<PopContent {{ ...name: data.properties.name, groups: groups, t }} />))

        /** TOOLTIP */
        // layer.bindTooltip(`${data.properties.name}: ${groups.length} ${groups.length === 1 ? 'gruppe' : 'grupper'}`)
        layer.bindTooltip(`${data.properties.name || data.properties.KOMNAVN}`)

        layer.options = {
            ...layer.options,
            color: mapStroke,
            fillColor:  groups.length > 0 ? defaultFill : emptyColor,
        }

        layer.options = groups.length > 0 ? {
            ...layer.options,
            color: mapStroke,
            fillOpacity: .5 + .1 * groups.length
        } :
            {
                ...layer.options,
                color: mapStroke,
                fillOpacity: 1,
            }

        layer.on(
            {
                click: kommuneClick,
                mouseover: mouseoverColor,
                mouseout: mouseleaveColor
            }
        )
        // console.log(layer)
    }

    return (
    <GeoJSON 
    attribution={attribution} 
    data={(municipalitiesGeoJSON as FeatureCollection)} 
    onEachFeature={onEachMunicipality}
    />)

}
export default GeoData