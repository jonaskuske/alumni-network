import store from '@/store';
import { mount, shallowMount } from '@vue/test-utils';
import { addFileList } from '../util';
import PostForm from '@/components/PostForm.vue';

const value = {
  title: 'mockTitle',
  content: 'mockContent',
  gallery: ['mock1', 'mock2'],
  usergroup: 'Alle',
};

describe('PostForm.vue', () => {
  it('updates title and content', () => {
    const wrapper = mount(PostForm, { store, propsData: { value } });

    wrapper.find('.create-post__title input').setValue('title');

    expect(wrapper.emitted('input')[0]).toEqual([{ ...value, title: 'title' }]);

    const contentInput = wrapper.find('.create-post__content');
    contentInput.element.value = 'content';
    contentInput.trigger('input');

    expect(wrapper.emitted('input')[1]).toEqual([
      { ...value, title: 'title', content: 'content' },
    ]);
  });

  it('updates usergroup selection', () => {
    const wrapper = shallowMount(PostForm, { store, propsData: { value } });
    const select = wrapper.find('#sel-usergroup');
    select.find('option[value="Studierende"').setSelected();
    select.trigger('input');

    expect(wrapper.emitted('input')[0]).toEqual([
      { ...value, usergroup: 'Studierende' },
    ]);
  });

  it('shows subforum selection only for new posts', () => {
    const editWrapper = shallowMount(PostForm, { store, propsData: { value } });
    const createWrapper = shallowMount(PostForm, {
      store,
      propsData: { value: { ...value, subforum: '' } },
    });

    expect(editWrapper.find('.create-post__subforum').isVisible()).toBe(false);
    expect(createWrapper.find('.create-post__subforum').isVisible()).toBe(true);
  });

  it('updates subforum selection', () => {
    const wrapper = shallowMount(PostForm, {
      store,
      propsData: { value: { ...value, subforum: '' } },
    });
    const select = wrapper.find('#sel-subforum');
    const option = select.find('option:not(:disabled)');
    option.setSelected();
    select.trigger('input');

    const subforum = option.element.value;
    expect(wrapper.emitted('input')[0]).toEqual([{ ...value, subforum }]);
  });

  it('shows gallery + 1 empty thumbnail', () => {
    const wrapper = mount(PostForm, { store, propsData: { value } });
    const thumbnails = wrapper.findAll('.create-post__thumbnail');

    expect(thumbnails.length).toEqual(value.gallery.length + 1);
  });

  it('shows 5 thumbnails if gallery is empty', () => {
    const wrapper = mount(PostForm, {
      store,
      propsData: { value: { ...value, gallery: [] } },
    });
    const thumbnails = wrapper.findAll('.create-post__thumbnail');

    expect(thumbnails.length).toEqual(5);
  });

  it('adds images to gallery array', done => {
    const wrapper = shallowMount(PostForm, { store, propsData: { value } });
    const input = wrapper.find('.test-test');

    addFileList(input.element, ['./tests/test.png', './tests/test.png']);
    input.trigger('change');

    setTimeout(() => {
      expect(wrapper.emitted('input')[0][0].gallery.length).toBe(
        value.gallery.length + 2,
      );
      done();
    }, 100);
  });

  it('removes images from gallery array', () => {
    const wrapper = mount(PostForm, { store, propsData: { value } });
    wrapper.find('.create-post__thumbnail').trigger('click');
    const [, ...withoutFirst] = value.gallery;
    expect(wrapper.emitted('input')[0][0].gallery).toEqual(withoutFirst);
  });
});
