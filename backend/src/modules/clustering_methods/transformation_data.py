from sklearn.decomposition import PCA
from sklearn.decomposition import KernelPCA

class transformer:
    def apply_pca_data(self, dataset):
        pca_transformer = PCA(n_components = 2)
        return pca_transformer.fit_transform(dataset)
    def apply_kernel_pca(self, dataset, kernel):
        transformer_instance = KernelPCA(kernel=kernel,n_components = 2)
        return transformer_instance.fit_transform(dataset)