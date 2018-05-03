/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { Component } = wp.element;

export default class Accordion extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		const {
			attributes,
			className,
		} = this.props;

		const {
			align,
			amount,
			amount_2,
			button,
			button_2,
			buttonBackground,
			buttonColor,
			columns,
			currency,
			currency_2,
			features,
			features_2,
			layout,
			tableBackground,
			tableColor,
			title,
			title_2,
			url,
			url_2,
		} = attributes;

		const buttonStyle = {
			backgroundColor: buttonBackground,
			color: buttonColor,
		};

		return (
			<div className={ this.props.className } style={ { backgroundColor: tableBackground } }>

				{ this.props.title && this.props.title.length > 0 && (
					<h4
						className={ 'pricing-table__title' }
						style={ {
							color: tableColor
						} }
					>
						{ this.props.title }
					</h4>
				) }

				<div className={ 'pricing-table__price' }>
					<span
						className={ 'pricing-table__currency' }
						style={ {
							color: tableColor
						} }
					>
						{ this.props.currency }
					</span>

					<h5
						className={ 'pricing-table__amount' }
						style={ {
							color: tableColor
						} }
					>
						{ this.props.amount }
					</h5>
				</div>

				<ul
					className={ 'pricing-table__features' }
					style={ {
						color: tableColor
					} }
				>
						{ this.props.features }
				</ul>

				{ this.props.button && this.props.button.length > 0 && (
					<span className={ 'wp-block-button' }>
						<a
							className={ 'wp-block-button__link pricing-table__button' }
							href={ this.props.url }
							title={ this.props.button }
							style={ buttonStyle }
						>
							{ this.props.button }
						</a>
					</span>
				) }

			</div>
		);
	}
}
