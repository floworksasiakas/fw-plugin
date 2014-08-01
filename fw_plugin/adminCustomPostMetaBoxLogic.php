<?php
/**
 * Adds a box to the main column on the Post screen.
 */
function myplugin_add_meta_box() {
    add_meta_box('customPostMeta'
        , __( 'Task Person', 'myplugin_textdomain' )
        , 'myplugin_meta_box_callback'
        , 'post'
    );
}

/**
 * Prints the box content.
 * 
 * @param WP_Post $post The object for the current post/page.
 */
function myplugin_meta_box_callback( $post ) {

    // Add an nonce field so we can check for it later.
    wp_nonce_field( 'myplugin_meta_box', 'myplugin_meta_box_nonce' );

    /*
     * Use get_post_meta() to retrieve an existing value
     * from the database and use the value for the form.
     */
    $value = get_post_meta( $post->ID, 'taskPerson', true );

    echo '<select id="postType" onchange="changeInputFields(this.value)">
            <option value="Status">Status</option>
            <option value="Task">Task</option>
            <option value="Blog">Blog</option>
          </select>';
    echo '<section id="wrap"></section>';

    echo '<label for="myplugin_new_field">';
    _e( 'Add the person responsible for this task', 'myplugin_textdomain' );
    echo '</label> ';
    echo '<input type="text" id="myplugin_new_field" name="myplugin_new_field" value="' . esc_attr( $value ) . '" size="25" />';
}

/**
 * When the post is saved, saves our custom data.
 *
 * @param int $post_id The ID of the post being saved.
 */
function myplugin_save_meta_box_data( $post_id ) {

    /*
     * We need to verify this came from our screen and with proper authorization,
     * because the save_post action can be triggered at other times.
     */

    // Check if our nonce is set.
    if ( ! isset( $_POST['myplugin_meta_box_nonce'] ) ) {
        return;
    }

    // Verify that the nonce is valid.
    if ( ! wp_verify_nonce( $_POST['myplugin_meta_box_nonce'], 'myplugin_meta_box' ) ) {
        return;
    }

    // If this is an autosave, our form has not been submitted, so we don't want to do anything.
    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
        return;
    }

    // Check the user's permissions.
    if ( isset( $_POST['post_type'] ) && 'page' == $_POST['post_type'] ) {

        if ( ! current_user_can( 'edit_page', $post_id ) ) {
            return;
        }

    } else {

        if ( ! current_user_can( 'edit_post', $post_id ) ) {
            return;
        }
    }

    /* OK, it's safe for us to save the data now. */
    
    // Make sure that it is set.
    if ( ! isset( $_POST['myplugin_new_field'] ) ) {
        return;
    }

    // Sanitize user input.
    $my_data = sanitize_text_field( $_POST['myplugin_new_field'] );

    // Update the meta field in the database.
    update_post_meta( $post_id, 'taskPerson', $my_data );
}
?>