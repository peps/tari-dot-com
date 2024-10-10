$(document).ready(function() {
    const itemsPerPage = 20;
    const $posts = $('.blog-area .js-stagger-delay-post-panel');
    const totalPages = Math.ceil($posts.length / itemsPerPage);
    let currentPage = 1;

    function showPage(page) {
      $posts.hide();
      $posts.slice((page - 1) * itemsPerPage, page * itemsPerPage).show();
    }

    function createPaginationControls() {
      const $paginationControls = $('#pagination-controls');
      $paginationControls.empty();
      for (let i = 1; i <= totalPages; i++) {
        $paginationControls.append(`<a href="#" class="page-link" data-page="${i}">${i}</a> `);
      }
      $paginationControls.find('.page-link').on('click', function(e) {
        e.preventDefault();
        currentPage = $(this).data('page');
        showPage(currentPage);
        updateActivePagination();
      });
      updateActivePagination();
    }

    function updateActivePagination() {
      $('#pagination-controls .page-link').removeAttr('id');
      $(`#pagination-controls .page-link[data-page="${currentPage}"]`).attr('id', 'active-pagination');
    }

    console.log('loaded')

    createPaginationControls();
    showPage(currentPage);
  });