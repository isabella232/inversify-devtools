import * as React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import bindingsActions from "../../actions/bindings_actions";
import KernelExplorer from "../../components/kernel_explorer";
import BindingExplorer from "../../components/binding_explorer";
import BindingPropsExplorer from "../../components/binding_props_explorer";
import SelectableKeyVal from "../../core/selectable_key_value_pair";

function mapStateToPropsReposPage(state: any) {
    return {
        app: state.get("app")
    };
}

function mapDispatchToPropsReposPage(dispatch: Redux.Dispatch) {
    return { actions : bindActionCreators(bindingsActions, dispatch) };
}

class BindingsPage extends React.Component<any, void> {
    public render() {

        let kernels = this.props.app.get("kernels").toJSON();
        let selectedKernel = kernels.filter((kernel: ISelectableKernel) => {
            return kernel.selected === true;
        })[0];

        let dictionary: any[] = [];
        let selectedKeyVal: any = [];
        if (selectedKernel) {
            dictionary = (selectedKernel.details._bindingDictionary._dictionary).map((keyVal: any) => {
                return new SelectableKeyVal(keyVal);
            });
            selectedKeyVal = dictionary.filter((keyVal: any) => {
                return keyVal.selected === true;
            })[0];
        }

        return (
            <div>
                <KernelExplorer height={this.props.app.get("windowHeight")}
                                columnSize={4} kernels={kernels}
                                selectKernel={this.props.actions.selectKernel.bind(this)} />

                <BindingExplorer height={this.props.app.get("windowHeight")}
                                columnSize={4} bindings={dictionary}
                                selectBinding={this.props.actions.selectBinding.bind(this)}/>

                <BindingPropsExplorer height={this.props.app.get("windowHeight")}
                                      columnSize={4} bindings={selectedKeyVal.values}/>

            </div>
        );

    }
}

export default connect(mapStateToPropsReposPage, mapDispatchToPropsReposPage)(BindingsPage);
