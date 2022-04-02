from sklearn.decomposition import PCA
from sklearn.decomposition import KernelPCA

class transformer(object):

    def apply_pca_data(self, dataset):

        #instance of PCA
        pca_transformer = PCA()
        return pca_transformer.fit_transform(dataset)

    def apply_kernel_pca(self, dataset, kernel):

        transformer_instance = KernelPCA(kernel=kernel)
        return transformer_instance.fit_transform(dataset)
