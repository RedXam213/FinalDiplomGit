import React, { useContext } from "react";
import TypeBar from "./TypeBar";
import BrandBarVertical from "./BrandBar";
import { Card, Stack,Button } from "react-bootstrap";
import { Context } from "../store/context";
import { observer } from "mobx-react-lite";
import PriceBar from "./PriceBar"
import '../styles/Global.css'

const SideBar = observer(() => {
  const { device } = useContext(Context);

  return (
    <Card style={{ height: "100vh",  padding: "15px" }}>
      <Stack gap={3}>
        <TypeBar />
        
        {device.selectedType.id && (
          <>
            <hr />
            <BrandBarVertical />
             <hr />
             <PriceBar />
             <hr />
             <Button
               variant="outline-danger"
               onClick={() => device.resetFiltersExceptType()} /*мб конфликты могут быть*/
             >
               Скинути фільтри
             </Button>
           </>
         )}

         
        
      </Stack>
    </Card>
  );
});

export default SideBar;
