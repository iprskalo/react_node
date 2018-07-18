class ProductList extends React.Component {
    render() {
        return (
            <div>a</div>
        );
    }
}

class Product extends React.Component {
    render() {
        return (
            <div class="ui divided items">
                <div class="item">
                    <div class="image">
                        <img src="/images/wireframe/image.png" />
                    </div>
                    <div class="content">
                        <a class="header">12 Years a Slave</a>
                        <div class="meta">
                            <span class="cinema">Union Square 14</span>
                        </div>
                        <div class="description">
                            <p></p>
                        </div>
                        <div class="extra">
                            <div class="ui label">
                                <img src='/images/products/like.png' />
                            </div>
                            <div class="ui label">Brojač</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Product />,
    document.getElementById('content')
);