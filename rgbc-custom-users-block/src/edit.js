const {
	InspectorControls,
} = wp.blockEditor;

const { __ } = wp.i18n;

const {apiFetch} = wp;

const {
	SelectControl,
	PanelBody,
	Button,
	ServerSideRender
} = wp.components;

const {
	useEffect,
	Fragment
} = wp.element;


const Edit = function( props ) {

	const {
		attributes: {
			users,
			allUsers,
		},
		attributes,
		setAttributes,
	} = props;

	useEffect(() => {

		apiFetch( {
			path: `/rgbc-users/v1/user-list`,
		} )
			.then(response => {
				setAttributes( {allUsers: response} );
			});
	}, []);

	const addUser = function( userID ) {

		const users = [ ...attributes.users ] || [];

		if ( ! users.includes( userID ) ) {
			users.push( userID );
			setAttributes( { users: users } );
		}

	};

	const removeUser = function( userID ) {

		const users = [ ...attributes.users ] || [];
		const index = users.indexOf( userID );

		if ( -1 < index ) {
			users.splice( index, 1 );
			setAttributes( { users: users } );
		}

	}

	const getUserLabel = function( userID ) {

		for ( var i = 0; i < users.length; i++ ) {
			if ( userID == users[ i ].value ) {
				return users[ i ].label;
			}
		}

		return userID;
	};

	return (
		<Fragment>
			<InspectorControls
				key={ 'custom-users-block-inspector' }
			>
				<PanelBody
					title={ __( 'Select Users' ) }
				>
					{users.length}
					<p>
						{ 0 < users.length && users.map( ( userID ) => {
							return <Fragment>
								<span>{ getUserLabel( userID ) }</span>
								<Button
									isSecondary
									isSmall
									onClick={ () => {
										removeUser( userID );
									} }
								>x</Button>
							</Fragment>
					} ) }
					</p>

					<SelectControl
						label={ __( 'Add User' ) }
						help={ __( 'Select user to show' ) }
						options={ allUsers }
						onChange={ ( value ) => {
							addUser( value );
						} }
					/>
				</PanelBody>
			</InspectorControls>

			<ServerSideRender
				block="rgbc/custom-users-block"
				attributes={ attributes }
			/>
		</Fragment>
	);
}

export default Edit;
