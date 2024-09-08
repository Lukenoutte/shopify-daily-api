import UpdateProductUseCase from "domain/usecases/update-product-usecase";
import AxiosHelper from "infra/helpers/axios-helper";
import FileReaderHelper from "infra/helpers/file-reader-helper";

export default class UpdateProductComposer {
    compose() {
        const axiosHelper = new AxiosHelper()
        const fileReaderHelper = new FileReaderHelper()
        const updateProductUseCase = new UpdateProductUseCase({
            axiosHelper,
            fileReaderHelper
        })
        updateProductUseCase.execute()
    }
}