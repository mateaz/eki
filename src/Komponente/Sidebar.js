import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SidebarContent from './SidebarContent';
import Checkbox from './Checkbox';
import { faChevronRight, faChevronDown, faRoad, faCity, faArchive } from '@fortawesome/free-solid-svg-icons';
import OpenTableCeste from './Tablica nerazvrstane ceste/OpenTableCeste';
import OpenTableKI from './Tablica komunalna infrastruktura/OpenTableKI';
import { MdSkipPrevious } from "react-icons/md";

export default class  Sidebar extends Component{
    state = {
        activeCollapse: '',
        activeItem: '',
        activeNaselje: '',
        cestePagInput: false,
        cesteMiskoviciInput: false,
        cesteGoricaInput: false,

        cesteBosanaInput: false,
        cesteDinjiskaInput: false,
        cesteKosljunInput: false,

        cesteSmokvicaInput: false,
        cesteStaraVasInput: false,
        cesteSimuniInput: false,
        cesteVlasiciInput: false,
        cesteVrciciInput: false,

        javneCesteDrzavneInput: false,
        javneCesteZupanijskeInput: false,
        javneCesteLokalneInput: false,
        rasvjeta1Input: false,
        rasvjeta2Input: false,
        rasvjeta3Input: false,
        rasvjeta4Input: false,
        rasvjeta5Input: false,
        rasvjeta6Input: false,
        rasvjeta7Input: false,
        grobljaInput: false,
        trgJavnePovrsineInput: false,
        plocniciJavnePovrsineInput: false,
        plazeJavnePovrsineInput: false,
        biciklistickeJavnePovrsineInput: false,
        mostoviJavnePovrsineInput: false,
        pjesackeJavnePovrsineInput: false,
        setalistaJavnePovrsineInput: false,
        parkiralistaNaplataJavnaInput: false,
        parkiralistaJavnaInput: false,
        sportskiTereniInput: false,
        djecjaIgralistaInput: false,
        parkoviInput: false,
        zeleniloInput: false,
        stajalistaPrijevozInput: false,
        spomeniciInput: false,
        odlagalistaInput: false,
        reciklaznaInput: false,
        trzniceInput: false,
        gradjevineInput: false,
        minimalize: false,
    }

    toggleChange = (evt) => {  
        this.setState({ [evt.target.name]: evt.target.checked });

        let a = {
            checked: false
        };
          
        let checkboxProps = Object.create(a);
          
        checkboxProps.target = evt.target.name;
        checkboxProps.checked = evt.target.checked;
        this.props.OnMessageOut(checkboxProps);
      }
    
    handleExpandCollaps = (name) => {
        if (this.state.activeCollapse === name) {

          //If collapsiable is already visible and clicked on same then this will hide it
            this.setState({ activeCollapse: '' })

        } else {
            //To show collapsiable
            this.setState({ activeCollapse: name })
        }
    };

    handleExpandSpan = (naselje) => {
          if (this.state.activeItem === naselje) {

            //If collapsiable is already visible and clicked on same then this will hide it
              this.setState({ activeItem: '' })
  
          } else {
              //To show collapsiable
              this.setState({ activeItem: naselje })
          }
    };

    handleZoomOnMap = (prop) => {
        this.props.OnZoomOnMap(prop);
    };

    sendJsonData = (jsondata) => {
        this.props.createJsonData(jsondata);
    };

    closeSidebarOnclick = (close) => {
        //console.log(close)
        if (close) {
            //this.props.closeSidebarOnClick(close); //ISTRAZI
            this.setState({minimalize: true});
        };
    };

    minimalizeSidebar = () => {
        this.setState({minimalize: !this.state.minimalize});
    };



   render() {

    const incompleteIcon =  <span className="span_icon"><FontAwesomeIcon icon={faChevronDown} /></span>;
    const completeIcon = <span className="span_icon"><FontAwesomeIcon icon={faChevronRight} /></span>;

    return (
        <div> 
            {this.props.showSidebar && 
            <div className={`sidebar-div ${this.state.minimalize ? 'left-sidebar': ''}` } id="sidebar-div">
                <div id="icon_slide" onClick={this.minimalizeSidebar}><MdSkipPrevious/></div>
                <div className={`sidebar-nav-menu ${this.state.minimalize ? 'nav-display': ''}` }>
                    <div className={`sidebar-nav-menu-item ${this.state.activeCollapse === "javneceste" ? 'item-active' : ''}`}  data-id="javneceste">
                        <div className="sidebar-nav-menu-item-head" >
                            <span className="span_icon" onClick={() => this.handleExpandCollaps("javneceste")}><FontAwesomeIcon icon={faArchive} /></span>
                            <span className="sidebar-nav-menu-item-head-title" onClick={() => this.handleExpandCollaps("javneceste")}>Javne ceste</span>
                        </div>
                        <div className="sidebar-nav-menu-item-body">
                            <div>
                                <Checkbox
                                    nameCheckbox="Državne ceste"
                                    name="javneCesteDrzavneInput"
                                    checked={this.state.javneCesteDrzavneInput}
                                    Change={this.toggleChange.bind(this)}
                                />
                            </div>
                            <div>
                                <Checkbox
                                    nameCheckbox="Županijske ceste"
                                    name="javneCesteZupanijskeInput"
                                    checked={this.state.javneCesteZupanijskeInput}
                                    Change={this.toggleChange.bind(this)}
                                />
                            </div>
                            <div>
                                <Checkbox
                                    nameCheckbox="Lokalne ceste"
                                    name="javneCesteLokalneInput"
                                    checked={this.state.javneCesteLokalneInput}
                                    Change={this.toggleChange.bind(this)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={`sidebar-nav-menu-item ${this.state.activeCollapse === "registar" ? 'item-active' : ''}`}  data-id="registar" >
                        <div className="sidebar-nav-menu-item-head">
                            <span className="span_icon"  onClick={() => this.handleExpandCollaps("registar")}><FontAwesomeIcon icon={faRoad}/></span>
                            <span className="sidebar-nav-menu-item-head-title" onClick={() => this.handleExpandCollaps("registar")}>Registar nerazvrstanih cesta</span>
                            {this.state.activeCollapse === "registar" ? <OpenTableCeste onZoomOnMap={this.handleZoomOnMap} handleJsonData={this.sendJsonData} closeSidebar={this.closeSidebarOnclick}/> : null}
                        </div>
                        <div className="sidebar-nav-menu-item-body">
                            <div>
                                <Checkbox
                                    nameCheckbox="Naselje Bošana"
                                    name="cesteBosanaInput"
                                    checked={this.state.cesteBosanaInput}
                                    Change={this.toggleChange.bind(this)}
                                />
                            </div>
                            <div>
                                <Checkbox
                                    nameCheckbox="Naselje Dinjiška"
                                    name="cesteDinjiskaInput"
                                    checked={this.state.cesteDinjiskaInput}
                                    Change={this.toggleChange.bind(this)}
                                />
                            </div>
                            <div>
                                <Checkbox
                                    nameCheckbox="Naselje Gorica"
                                    name="cesteGoricaInput"
                                    checked={this.state.cesteGoricaInput}
                                    Change={this.toggleChange.bind(this)}
                                />
                            </div>
                            <div>
                                <Checkbox
                                    nameCheckbox="Naselje Košljun"
                                    name="cesteKosljunInput"
                                    checked={this.state.cesteKosljunInput}
                                    Change={this.toggleChange.bind(this)}
                                />
                            </div>
                            <div>
                                <Checkbox
                                    nameCheckbox="Naselje Miškovići"
                                    name="cesteMiskoviciInput"
                                    checked={this.state.cesteMiskoviciInput}
                                    Change={this.toggleChange.bind(this)}
                                />
                            </div>
                            <div>
                                <Checkbox
                                    nameCheckbox="Naselje Pag"
                                    name="cestePagInput"
                                    checked={this.state.cestePagInput}
                                    Change={this.toggleChange.bind(this)}
                                />
                            </div>
                            <div>
                                <Checkbox
                                    nameCheckbox="Naselje Smokvica"
                                    name="cesteSmokvicaInput"
                                    checked={this.state.cesteSmokvicaInput}
                                    Change={this.toggleChange.bind(this)}
                                />
                            </div>
                            <div>
                                <Checkbox
                                    nameCheckbox="Naselje Stara Vas"
                                    name="cesteStaraVasInput"
                                    checked={this.state.cesteStaraVasInput}
                                    Change={this.toggleChange.bind(this)}
                                />
                            </div>
                            <div>
                                <Checkbox
                                    nameCheckbox="Naselje Šimuni"
                                    name="cesteSimuniInput"
                                    checked={this.state.cesteSimuniInput}
                                    Change={this.toggleChange.bind(this)}
                                />
                            </div>
                            <div>
                                <Checkbox
                                    nameCheckbox="Naselje Vlašići"
                                    name="cesteVlasiciInput"
                                    checked={this.state.cesteVlasiciInput}
                                    Change={this.toggleChange.bind(this)}
                                />
                            </div>
                            <div>
                                <Checkbox
                                    nameCheckbox="Naselje Vrčići"
                                    name="cesteVrciciInput"
                                    checked={this.state.cesteVrciciInput}
                                    Change={this.toggleChange.bind(this)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={`sidebar-nav-menu-item ${this.state.activeCollapse === "komunalna" ? 'item-active' : ''}`}  data-id="komunalna">
                        <div className="sidebar-nav-menu-item-head" >
                            <span className="span_icon" onClick={() => this.handleExpandCollaps("komunalna")}><FontAwesomeIcon icon={faCity}/></span>
                            <span className="sidebar-nav-menu-item-head-title" onClick={() => this.handleExpandCollaps("komunalna")}>Komunalna infrastrukutra</span>
                            {this.state.activeCollapse === "komunalna" ? <OpenTableKI onZoomOnMap={this.handleZoomOnMap} closeSidebar={this.closeSidebarOnclick}/> : null}
                        </div>
                        <div className="sidebar-nav-menu-item-body">
                            <SidebarContent
                                klasa = {this.state.activeItem === "javnePovrsine" ? 'item-display': ''}
                                handleExpand={()=>this.handleExpandSpan("javnePovrsine")}
                                ikonica = {this.state.activeItem === "javnePovrsine" ? incompleteIcon: completeIcon}
                                imeNaselja={'Javne površine bez prometa'}
                                body = {
                                    <div>
                                        <Checkbox
                                            nameCheckbox="Trg"
                                            name="trgJavnePovrsineInput"
                                            checked={this.state.trgJavnePovrsineInput}
                                            Change={this.toggleChange.bind(this)}
                                        />
                                        <Checkbox
                                            nameCheckbox="Pločnici, prečaci i nogostupi"
                                            name="plocniciJavnePovrsineInput"
                                            checked={this.state.plocniciJavnePovrsineInput}
                                            Change={this.toggleChange.bind(this)}
                                        />
                                        <Checkbox
                                            nameCheckbox="Plaže"
                                            name="plazeJavnePovrsineInput"
                                            checked={this.state.plazeJavnePovrsineInput}
                                            Change={this.toggleChange.bind(this)}
                                        />
                                        <Checkbox
                                            nameCheckbox="Biciklističke i pješačke staze"
                                            name="biciklistickeJavnePovrsineInput"
                                            checked={this.state.biciklistickeJavnePovrsineInput}
                                            Change={this.toggleChange.bind(this)}
                                        />
                                        <Checkbox
                                            nameCheckbox="Mostovi"
                                            name="mostoviJavnePovrsineInput"
                                            checked={this.state.mostoviJavnePovrsineInput}
                                            Change={this.toggleChange.bind(this)}
                                        />
                                        <Checkbox
                                            nameCheckbox="Pješačke zone"
                                            name="pjesackeJavnePovrsineInput"
                                            checked={this.state.pjesackeJavnePovrsineInput}
                                            Change={this.toggleChange.bind(this)}
                                        />
                                        <Checkbox
                                            nameCheckbox="Pješačke zone - šetališta"
                                            name="setalistaJavnePovrsineInput"
                                            checked={this.state.setalistaJavnePovrsineInput}
                                            Change={this.toggleChange.bind(this)}
                                        />
                                    </div>
                                    
                                }
                            />
                            <SidebarContent
                                klasa = {this.state.activeItem === "javnaParkiralista" ? 'item-display': ''}
                                handleExpand={()=>this.handleExpandSpan("javnaParkiralista")}
                                ikonica = {this.state.activeItem === "javnaParkiralista" ? incompleteIcon: completeIcon}
                                imeNaselja={'Javna parkirališta'}
                                body = {
                                    <div>
                                        <Checkbox
                                            nameCheckbox="Parkirališta s naplatom"
                                            name="parkiralistaNaplataJavnaInput"
                                            checked={this.state.parkiralistaNaplataJavnaInput}
                                            Change={this.toggleChange.bind(this)}
                                        />
                                        <Checkbox
                                            nameCheckbox="Parkirališta"
                                            name="parkiralistaJavnaInput"
                                            checked={this.state.parkiralistaJavnaInput}
                                            Change={this.toggleChange.bind(this)}
                                        />
                                    </div>
                                }
                            />
                            <SidebarContent
                                klasa = {this.state.activeItem === "javneZelenePovrsine" ? 'item-display': ''}
                                handleExpand={()=>this.handleExpandSpan("javneZelenePovrsine")}
                                ikonica = {this.state.activeItem === "javneZelenePovrsine" ? incompleteIcon: completeIcon}
                                imeNaselja={'Javne zelene površine'}
                                body = {
                                    <div>
                                        <Checkbox
                                            nameCheckbox="Sportski tereni"
                                            name="sportskiTereniInput"
                                            checked={this.state.sportskiTereniInput}
                                            Change={this.toggleChange.bind(this)}
                                        />
                                        <Checkbox
                                            nameCheckbox="Dječja igrališta"
                                            name="djecjaIgralistaInput"
                                            checked={this.state.djecjaIgralistaInput}
                                            Change={this.toggleChange.bind(this)}
                                        />
                                        <Checkbox
                                            nameCheckbox="Parkovi"
                                            name="parkoviInput"
                                            checked={this.state.parkoviInput}
                                            Change={this.toggleChange.bind(this)}
                                        />
                                        <Checkbox
                                            nameCheckbox="Drvoredi, živice i travnjaci"
                                            name="zeleniloInput"
                                            checked={this.state.zeleniloInput}
                                            Change={this.toggleChange.bind(this)}
                                        />
                                    </div>
                                }
                            />
                            <SidebarContent
                                klasa = {this.state.activeItem === "gradjevine" ? 'item-display': ''}
                                handleExpand={()=>this.handleExpandSpan("gradjevine")}
                                ikonica = {this.state.activeItem === "gradjevine" ? incompleteIcon: completeIcon}
                                imeNaselja={'Građevine i uređaji javne namjene'}
                                body = {
                                    <div>
                                        <Checkbox
                                            nameCheckbox="Stajališta javnog prijevoza"
                                            name="stajalistaPrijevozInput"
                                            checked={this.state.stajalistaPrijevozInput}
                                            Change={this.toggleChange.bind(this)}
                                        />
                                        <Checkbox
                                            nameCheckbox="Spomenici"
                                            name="spomeniciInput"
                                            checked={this.state.spomeniciInput}
                                            Change={this.toggleChange.bind(this)}
                                        />
                                        <Checkbox
                                            nameCheckbox="Odlagališta otpada"
                                            name="odlagalistaInput"
                                            checked={this.state.odlagalistaInput}
                                            Change={this.toggleChange.bind(this)}
                                        />
                                        <Checkbox
                                            nameCheckbox="Reciklažna dvorišta"
                                            name="reciklaznaInput"
                                            checked={this.state.reciklaznaInput}
                                            Change={this.toggleChange.bind(this)}
                                        />
                                        <Checkbox
                                            nameCheckbox="Sajmišta i tržnice"
                                            name="trzniceInput"
                                            checked={this.state.trzniceInput}
                                            Change={this.toggleChange.bind(this)}
                                        />
                                         <Checkbox
                                            nameCheckbox="Građevine lokalnog značaja"
                                            name="gradjevineInput"
                                            checked={this.state.gradjevineInput}
                                            Change={this.toggleChange.bind(this)}
                                        />
                                    </div>
                                }
                            />
                            <Checkbox
                                nameCheckbox="Groblja i krematoriji"
                                name="grobljaInput"
                                checked={this.state.grobljaInput}
                                Change={this.toggleChange.bind(this)}
                            />
                            <SidebarContent
                                klasa = {this.state.activeItem === "rasvjeta" ? 'item-display': ''}
                                handleExpand={()=>this.handleExpandSpan("rasvjeta")}
                                ikonica = {this.state.activeItem === "rasvjeta" ? incompleteIcon: completeIcon}
                                imeNaselja={'Rasvjeta'}
                                body = {
                                    <div>
                                        <Checkbox
                                            nameCheckbox="1"
                                            name="rasvjeta1Input"
                                            checked={this.state.rasvjeta1Input}
                                            Change={this.toggleChange.bind(this)}
                                        />
                                        <Checkbox
                                            nameCheckbox="2"
                                            name="rasvjeta2Input"
                                            checked={this.state.rasvjeta2Input}
                                            Change={this.toggleChange.bind(this)}
                                        />
                                        <Checkbox
                                            nameCheckbox="3"
                                            name="rasvjeta3Input"
                                            checked={this.state.rasvjeta3Input}
                                            Change={this.toggleChange.bind(this)}
                                        />
                                        <Checkbox
                                            nameCheckbox="4"
                                            name="rasvjeta4Input"
                                            checked={this.state.rasvjeta4Input}
                                            Change={this.toggleChange.bind(this)}
                                        />
                                        <Checkbox
                                            nameCheckbox="5"
                                            name="rasvjeta5Input"
                                            checked={this.state.rasvjeta5Input}
                                            Change={this.toggleChange.bind(this)}
                                        />
                                         <Checkbox
                                            nameCheckbox="6"
                                            name="rasvjeta6Input"
                                            checked={this.state.rasvjeta6Input}
                                            Change={this.toggleChange.bind(this)}
                                        />
                                        <Checkbox
                                            nameCheckbox="7"
                                            name="rasvjeta7Input"
                                            checked={this.state.rasvjeta7Input}
                                            Change={this.toggleChange.bind(this)}
                                        />
                                    </div>
                                }
                            />
                        </div>
                    </div>
                </div>
                
            </div> 
            }
        </div>
    )
}}