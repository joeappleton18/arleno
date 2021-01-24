import { useEffect } from 'react';
import { Schedule } from '../../components/ContentBlocks';
import { useStores } from '../../stores/'

const SchedulePage = () => {

    const uiStore = useStores().uiStore;

    useEffect(() => {
        uiStore.setHideMenu(true);
        return () => {
            uiStore.setHideMenu(false);
        }
    }, [])



    return (

        <div>

            <Schedule />

        </div>
    )
}

export default SchedulePage;