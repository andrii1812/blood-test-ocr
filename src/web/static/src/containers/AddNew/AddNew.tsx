import * as React from "react";
import {IAppState, ITestImage, IBloodTest, ISortable } from '../../model'
import TestEdit from "../TestEdit/TestEdit";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";
import { SubspaceProvider } from "react-redux-subspace";
import { Translate } from "react-localize-redux";
import { clearTest, testLoaded } from "../TestEdit/actions";
import { namespacedAction } from "redux-subspace";
import { loadImages } from "../UploadedImages/actions";
import ImageSelect from '../../components/ImageSelect/ImageSelect';
import {initialBloodTest} from '../../model/bloodTest'

interface IAddNewProps {
    references: ISortable[],
    tags: ISortable[],
    images: ITestImage[] | null,
    test: IBloodTest | null,
    clearTest: () => void,
    loadImages: () => void,
    loadTest: (test: IBloodTest) => void
}

const mapStateToProps = (state: IAppState) => ({
    references: state.app.references,
    tags: state.app.tags,
    images: state.uploadedImages.images,
    test: state.addNew.editValues.value
})

const mapDispatchToProps = (dispatch: any) => ({
    clearTest: () => dispatch(namespacedAction('editValues')(clearTest())),
    loadImages: () => dispatch(loadImages()),
    loadTest: (test: IBloodTest) => dispatch(namespacedAction('editValues')(testLoaded(test)))
})

class AddNew extends React.Component<IAddNewProps> {

    componentDidMount(){
        if (this.props.images && this.props.images.length === 0) {
            this.props.loadImages();
        }

        this.props.clearTest();
    }

    imagesSelected(images: ITestImage[]) {
        const state = initialBloodTest()
        state.images = images;
        this.props.loadTest(state);
    }

    render() {
        return (
            <Grid container spacing={16} direction="column" justify="flex-end">
                <Grid item>
                    {this.props.images && <ImageSelect list={this.props.images} selected={this.imagesSelected.bind(this)}/>}
                </Grid>              
                {this.props.test && 
                    (<Grid item>
                        <SubspaceProvider mapState={(s: IAppState) => s.addNew.editValues.value} namespace="editValues">
                            <Translate>
                                {({translate}) => <TestEdit 
                                                        title={translate('parsedResults')} 
                                                        references={this.props.references}
                                                        tags={this.props.tags}/>}
                            </Translate>
                        </SubspaceProvider>
                    </Grid>)
                }  
            </Grid>                 
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNew)