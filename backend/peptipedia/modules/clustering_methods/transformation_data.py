"""Transforms data module"""
from sklearn.decomposition import PCA, KernelPCA

class Transformer:
    """Transformer class"""
    def apply_pca_data(self, dataset):
        """Apply PCA"""
        pca_transformer = PCA(n_components=2)
        return pca_transformer.fit_transform(dataset)

    def apply_kernel_pca(self, dataset, kernel):
        """Apply kernel PCA"""
        transformer_instance = KernelPCA(kernel=kernel, n_components=2)
        return transformer_instance.fit_transform(dataset)
